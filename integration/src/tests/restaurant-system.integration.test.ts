import { RestaurantSystem } from '../RestaurantService';
import { describe, expect, beforeEach, test } from 'vitest';
import { IProduct, ICustomer, IOrder, IInvoice } from '../types';

describe('Restaurant System Integration Tests', () => {
  let system: RestaurantSystem;
  
  // Variables pour stocker les références aux objets créés
  let customer: ICustomer;
  let pizza: IProduct;
  let soda: IProduct;
  
  beforeEach(() => {
    // Initialiser un nouveau système pour chaque test
    system = new RestaurantSystem();
    
    // Créer un client
    customer = system.getCustomerService().createCustomer({
      name: 'Jean Dupont',
      email: 'jean@example.com',
      address: '123 Rue de Paris, 75001 Paris',
      phone: '+33123456789'
    });
    
    // Créer des produits
    pizza = system.getProductService().createProduct({
      name: 'Margherita',
      description: 'Tomate, mozzarella, basilic',
      price: 12.5,
      category: 'main',
      available: true,
      preparationTimeMinutes: 20
    });
    
    soda = system.getProductService().createProduct({
      name: 'Cola',
      description: 'Boisson gazeuse',
      price: 3.5,
      category: 'drink',
      available: true,
      preparationTimeMinutes: 1
    });
  });
  
  test('Complete order process should work correctly', () => {
    // 1. Créer une commande
    const orderItems = [
      { productId: pizza.id, quantity: 1 },
      { productId: soda.id, quantity: 2 }
    ];
    
    const result = system.processOrder(customer.id, orderItems);
    
    // 2. Vérifier que la commande et la facture ont été créées
    expect(result.order).not.toBeNull();
    expect(result.invoice).not.toBeNull();
    
    const order = result.order as IOrder;
    const invoice = result.invoice as IInvoice;
    
    // 3. Vérifier les détails de la commande
    expect(order.customerId).toBe(customer.id);
    expect(order.status).toBe('pending');
    expect(order.items.length).toBe(2);
    expect(order.totalAmount).toBe(pizza.price + (soda.price * 2));
    
    // 4. Vérifier les détails de la facture
    expect(invoice.orderId).toBe(order.id);
    expect(invoice.customerId).toBe(customer.id);
    expect(invoice.totalAmount).toBe(order.totalAmount);
    expect(invoice.tax).toBe(order.totalAmount * 0.1);
    expect(invoice.paid).toBe(false);
    
    // 5. Payer la facture
    const paymentResult = system.getInvoiceService().payInvoice(invoice.id, 'credit_card');
    expect(paymentResult).toBe(true);
    
    // 6. Vérifier que la facture est maintenant payée
    const updatedInvoice = system.getInvoiceService().getInvoice(invoice.id);
    expect(updatedInvoice?.paid).toBe(true);
    expect(updatedInvoice?.paymentMethod).toBe('credit_card');
    expect(updatedInvoice?.paidAt).toBeDefined();
    
    // 7. Vérifier que les points de fidélité ont été attribués
    const updatedCustomer = system.getCustomerService().getCustomer(customer.id);
    expect(updatedCustomer?.loyaltyPoints).toBe(1);
  });

  test('Loyalty points should be correctly awarded after invoice payment', () => {
    const orderItems = [
      { productId: pizza.id, quantity: 2 },
      { productId: soda.id, quantity: 3 }
    ];
  
    const result = system.processOrder(customer.id, orderItems);
  
    // Étape 1 : Vérifier que la commande et la facture existent
    expect(result.order).not.toBeNull();
    expect(result.invoice).not.toBeNull();
  
    const order = result.order as IOrder;
    const invoice = result.invoice as IInvoice;
  
    // Étape 2 : Vérifier le total de la commande
    const expectedTotal = 2 * pizza.price + 3 * soda.price;
    expect(order.totalAmount).toBeCloseTo(expectedTotal);
    expect(invoice.totalAmount).toBeCloseTo(expectedTotal);
  
    // Étape 3 : Payer la facture
    const paid = system.getInvoiceService().payInvoice(invoice.id, 'cash');
    expect(paid).toBe(true);
  
    // Étape 4 : Vérifier les points de fidélité attribués
    const updatedCustomer = system.getCustomerService().getCustomer(customer.id);
    const expectedPoints = Math.floor(expectedTotal / 10);
    expect(updatedCustomer?.loyaltyPoints).toBe(expectedPoints);
  });
  
  test('Order should fail if a product is unavailable, and succeed after making it available', () => {
    // 1. Rendre la pizza indisponible
    system.getProductService().updateProductAvailability(pizza.id, false);
    
    // 2. Tenter de passer une commande avec une pizza indisponible
    const orderItems = [
      { productId: pizza.id, quantity: 1 },
      { productId: soda.id, quantity: 1 }
    ];

    // 3. Vérifier que la commande échoue (retourne null)
    const failedOrder = system.processOrder(customer.id, orderItems);
    expect(failedOrder.order).toBeNull();
    expect(failedOrder.invoice).toBeNull();

    // 4. Rendre la pizza à nouveau disponible
    system.getProductService().updateProductAvailability(pizza.id, true);

    // 5. Re-tenter la commande
    const successOrder = system.processOrder(customer.id, orderItems);
    expect(successOrder.order).not.toBeNull();
    expect(successOrder.invoice).not.toBeNull();

    // 6. Vérification des données de la commande réussie
    const order = successOrder.order as IOrder;
    expect(order.items.length).toBe(2);
    expect(order.items.find(item => item.productId === pizza.id)).toBeDefined();
    expect(order.items.find(item => item.productId === soda.id)).toBeDefined();
  });

  test('Order status transitions and cancellation logic', () => {
    // 1. Créer une commande
    const orderItems = [
      { productId: pizza.id, quantity: 1 },
      { productId: soda.id, quantity: 1 }
    ];
  
    const result1 = system.processOrder(customer.id, orderItems);
    expect(result1.order).not.toBeNull();
    const order = result1.order!;
    expect(order.status).toBe('pending');
  
    // 2. Essayer d'annuler la commande (doit réussir)
    const cancelled = system.getOrderService().cancelOrder(order.id);
    expect(cancelled).toBe(true);
  
    const cancelledOrder = system.getOrderService().getOrder(order.id);
    expect(cancelledOrder?.status).toBe('cancelled');
  
    // 3. Recréer une nouvelle commande
    const result2 = system.processOrder(customer.id, orderItems);
    expect(result2.order).not.toBeNull();
    const newOrder = result2.order!;
    expect(newOrder.status).toBe('pending');
  
    // 4. Passer le statut à "preparing"
    const preparingUpdated = system.getOrderService().updateOrderStatus(newOrder.id, 'preparing');
    expect(preparingUpdated).toBe(true);
    const updatedOrder = system.getOrderService().getOrder(newOrder.id);
    expect(updatedOrder?.status).toBe('preparing');
  
    // 5. Essayer d’annuler à ce stade (doit échouer)
    const cancelWhilePreparing = system.getOrderService().cancelOrder(newOrder.id);
    expect(cancelWhilePreparing).toBe(false);
  
    // 6. Pousser jusqu’à "ready"
    system.getOrderService().updateOrderStatus(newOrder.id, 'ready');
    const finalOrder = system.getOrderService().getOrder(newOrder.id);
    expect(finalOrder?.status).toBe('ready');
  
    // 7. Essayer d’annuler après completion (doit aussi échouer)
    const cancelAfterReady = system.getOrderService().cancelOrder(newOrder.id);
    expect(cancelAfterReady).toBe(false);
  });
  

  // Ajoutez d'autres tests ici...
});