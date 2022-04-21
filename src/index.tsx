import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createServer } from 'miragejs'

const arr = [
  {
    id: 1,
    title: 'Transaction 1',
    amount: 400,
    type: 'deposit',
    category: 'Food',
    createdAt: new Date()
  }
]
createServer({
  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return arr
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return arr.push(data)
    })
  }
})
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App />
);