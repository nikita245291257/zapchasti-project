import React, { useState, useEffect } from 'react';
import PartsAPI from './service'; 

function App() {
 
  const [parts, setParts] = useState([]);


  const [formData, setFormData] = useState({
    name: '',
    article: '',
    price: '',
    quantity: '',
  });


  useEffect(() => {
    setParts([...PartsAPI.all()]);
  }, []);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    if (!formData.name || !formData.article || !formData.price || !formData.quantity) {
      alert('Пожалуйста, заполните все поля');
      return;
    }


    const newPart = {
      name: formData.name,
      article: formData.article,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };


    PartsAPI.add(newPart);
    

    setParts([...PartsAPI.all()]);
    
  
    setFormData({ name: '', article: '', price: '', quantity: '' });
  };


  const handleDelete = (id) => {
  
    PartsAPI.delete(id);
    
  
    setParts([...PartsAPI.all()]);
  };

  return (
    <div>
      <h1>Магазин автозапчастей</h1>

      {/* Форма добавления новой запчасти */}
      <h2>Добавить запчасть</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Название: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Например: Свеча зажигания"
          />
        </div>
        <div>
          <label>Артикул: </label>
          <input
            type="text"
            name="article"
            value={formData.article}
            onChange={handleInputChange}
            placeholder="Например: SP-123"
          />
        </div>
        <div>
          <label>Цена (руб): </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Например: 1500"
          />
        </div>
        <div>
          <label>Количество: </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Например: 5"
          />
        </div>
        <button type="submit">Добавить запчасть</button>
      </form>

      <hr />

      {/* Таблица со списком запчастей */}
      <h2>Список запчастей на складе</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Артикул</th>
            <th>Цена (руб)</th>
            <th>Количество</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {parts.length === 0 ? (
            <tr>
              <td colSpan="6">Список пуст</td>
            </tr>
          ) : (
            parts.map((part) => (
              <tr key={part.id}>
                <td>{part.id}</td>
                <td>{part.name}</td>
                <td>{part.article}</td>
                <td>{part.price}</td>
                <td>{part.quantity}</td>
                <td>
                  <button onClick={() => handleDelete(part.id)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;