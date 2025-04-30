import { Controller, Post, Body } from '@nestjs/common';
import fetch from 'node-fetch';

@Controller('payments')
export class PaymentsController {
  @Post()
  async processPayment(@Body() body: any) {
    const { amount, email } = body;

    const response = await fetch('https://sandbox.wompi.co/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'prv_stagint_lTEnn9pj5ugWuyiKzFZVIP7SKsImvCh7', // 👈 Usa tu clave real
      },
      body: JSON.stringify({
        amount_in_cents: amount,
        currency: 'COP',
        customer_email: email,
        payment_method: {
          type: 'CARD',
          token: 'tok_test_visa_4242',
          installments: 1,
        },
        reference: `ref_${Date.now()}`,
        redirect_url: 'https://localhost/thankyou',
      }),
    });

    const result = await response.json();
    return result;
  }
}
