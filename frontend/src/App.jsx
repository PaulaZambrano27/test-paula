import { useEffect, useState } from 'react';
import Modal from 'react-modal';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardType, setCardType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
	email: '',
    address: '',
    cardNumber: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:3000/products');
    const data = await res.json();
    setProducts(data);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFormData({ name: '', address: '', cardNumber: '' });
    setCardType('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'cardNumber') {
      const value = e.target.value;
      if (value.startsWith('4')) {
        setCardType('visa');
      } else if (value.startsWith('5')) {
        setCardType('mastercard');
      } else {
        setCardType('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const base = Number(selectedProduct.price);
    const wompiFee = Math.round(base * 0.039 + 800);
    const deliveryFee = 3000;
    const total = base + wompiFee + deliveryFee;

    try {
      const customerRes = await fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          address: formData.address,
        }),
      });
      const customer = await customerRes.json();

      const wompiRes = await fetch('http://localhost:3000/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          email: customer.email,
        }),
      });
      const wompiResult = await wompiRes.json();
      const transactionStatus = wompiResult?.data?.status || 'fail';

      const transactionRes = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: transactionStatus,
          amount: total,
        }),
      });
      const transaction = await transactionRes.json();

      const deliveryRes = await fetch('http://localhost:3000/deliveries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: customer.id,
          productId: selectedProduct.id,
          transactionId: transaction.id,
        }),
      });
      const delivery = await deliveryRes.json();

      alert(
        `✅ Compra realizada con éxito\n\n` +
        `Producto: ${selectedProduct.name}\n` +
        `Total pagado: $${total}\n` +
        `Estado de entrega: ${delivery.deliveryStatus}`
      );

      await fetchProducts();
    } catch (error) {
      console.error('❌ Error en el proceso de pago:', error);
      alert('Ocurrió un error al procesar la compra');
    }

    closeModal();
  };

  const base = Number(selectedProduct?.price || 0);
  const wompiFee = Math.round(base * 0.039 + 800);
  const deliveryFee = 3000;
  const total = base + wompiFee + deliveryFee;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tienda Wompi</h1>
      <h2>Productos disponibles</h2>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              width: '220px',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              backgroundColor: '#fff'
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '0.5rem'
              }}
            />
            <strong>{product.name}</strong>
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => openModal(product)}>Comprar</button>
          </div>
        ))}
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Formulario de pago">
        <h2>Formulario de pago</h2>
        <form onSubmit={handleSubmit}>
          <p><strong>Producto:</strong> {selectedProduct?.name}</p>
          <img
            src={selectedProduct?.image}
            alt={selectedProduct?.name}
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'cover',
              borderRadius: '10px',
              marginBottom: '10px'
            }}
          />
          <br />
          <label>
            Nombre:
            <br />
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </label>
          <br />
		  <label>
		  Correo electrónico:
			  <br />
			  <input
				type="email"
				name="email"
				value={formData.email}
				onChange={handleInputChange}
				required
			  />
			</label>
			<br />
          <label>
            Dirección:
            <br />
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
          </label>
          <br />
          <label>
            Tarjeta (fake):
            <br />
            <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
            <br />
			  </label>
			  {cardType && (
				<img
				  src={
					cardType === 'visa'
					  ? 'https://img.icons8.com/color/48/visa.png'
					  : 'https://img.icons8.com/color/48/mastercard.png'
				  }
				  alt={cardType}
				  style={{ height: '60px', marginTop: '8px' }}
				/>
			  )}

          {/* 🧾 Resumen de pago compacto */}
          <div style={{
            backgroundColor: '#dce3ea',
            padding: '0.75rem',
            borderRadius: '8px',
            marginTop: '1rem',
            width: '100%',
            maxWidth: '300px'
          }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Resumen</h3>
            <p>Producto: <strong>${base}</strong></p>
            <p>Wompi fee: <strong>${wompiFee}</strong></p>
            <p>Envío: <strong>${deliveryFee}</strong></p>
            <hr />
            <p>Total: <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>${total}</span></p>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1c334f',
              color: '#fff',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            💳 Pagar con tarjeta de crédito
          </button>

          <button type="button" onClick={closeModal} style={{ marginLeft: '1rem' }}>
            Cancelar
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default App;
