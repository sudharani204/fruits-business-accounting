import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Purchase');
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('fruitBusinessData');
    return saved ? JSON.parse(saved) : {
      Purchase: [],
      Sales: [],
      Stock: [],
      Wastage: [],
      Expenses: [],
      Receivable: [],
      Payable: [],
      CashBook: []
    };
  });

  const [formData, setFormData] = useState({});

  useEffect(() => {
    localStorage.setItem('fruitBusinessData', JSON.stringify(data));
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [activeTab]: [...data[activeTab], formData]
    });
    setFormData({});
  };

  const tabs = ["Purchase", "Sales", "Stock", "Wastage", "Expenses", "Receivable", "Payable", "CashBook"];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: 200, backgroundColor: '#2d3748', color: 'white', padding: 20 }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: 10,
              marginBottom: 5,
              backgroundColor: activeTab === tab ? '#4299e1' : 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
        <h1 style={{ marginBottom: 20 }}>{activeTab} Register</h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
          {Object.keys(formData).length === 0 && (
            <button
              type="button"
              onClick={() => setFormData({ Date: '', Item: '', Quantity: '', Amount: '' })}
              style={{ marginBottom: 10 }}
            >
              + Add New Entry
            </button>
          )}
          {Object.keys(formData).map((field) => (
            <div key={field} style={{ marginBottom: 10 }}>
              <input
                name={field}
                placeholder={field}
                value={formData[field]}
                onChange={handleChange}
                style={{ padding: 8, width: '100%' }}
                required
              />
            </div>
          ))}
          {Object.keys(formData).length > 0 && (
            <button type="submit" style={{ padding: 10, backgroundColor: '#3182ce', color: 'white', border: 'none' }}>
              Save Entry
            </button>
          )}
        </form>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#e2e8f0' }}>
            <tr>
              {data[activeTab][0] && Object.keys(data[activeTab][0]).map((col) => (
                <th key={col} style={{ border: '1px solid #cbd5e0', padding: 8 }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data[activeTab].map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j} style={{ border: '1px solid #cbd5e0', padding: 8 }}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}