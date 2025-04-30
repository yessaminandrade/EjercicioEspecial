document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementsByClassName('btn btn-primary my-2')[0];
  
    if (button) {
      button.addEventListener('click', loadProducts);
    }
  
    function loadProducts() {
      fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(data => {
          const container = document.querySelector('.row.row-cols-1.row-cols-sm-2.row-cols-md-3.g-3');
          container.innerHTML = '';
  
          data.slice(0, 9).forEach(product => {
            const col = document.createElement('div');
            col.classList.add('col');
  
            col.innerHTML = `
              <div class="card shadow-sm">
                <img src="${getValidImage(product.images)}" class="card-img-top" width="100%" height="225" alt="${product.title}">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product.description}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <small class="text-body-secondary"><strong>$${product.price}</strong></small>
                  </div>
                </div>
              </div>
            `;
  
            container.appendChild(col);
          });
        })
        .catch(error => console.error('Error al cargar productos:', error));
    }
  
    function getValidImage(images) {
      if (images && images.length > 1 && images[1].startsWith('http')) return images[1];
      if (images && images.length > 0 && images[0].startsWith('http')) return images[0];
      return 'https://via.placeholder.com/300x225?text=No+Image';
    }
  });
  
  
  
  