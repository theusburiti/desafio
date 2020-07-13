class Render {
  constructor() {
    this.urlEndPoint = "http://localhost:8888/api/V1/categories/";
    this.listCategories = [];
    this.componentBuild();
  };

  getAllCategories() {
    fetch(`${this.urlEndPoint}list`)
      .then(data => data.json())
      .then(data => {
        this.listCategories = data.items;
        this.renderAllCategories();
      });
  };

  getCategoriesForId(id, titlePage) {
    fetch(`${this.urlEndPoint}${id}`)
      .then(data => data.json())
      .then(data => {
        this.renderCategory(data, titlePage)
      });
  }

  renderAllCategories() {
    const categories = document.querySelector('#menu .wrapper > ul > li');
    let values = '';
    this.listCategories.map((value) => {
      values += `\n <li><a href="/${value.path}" data-id="${value.id}">${value.name}</a></li>`
    });
    categories.insertAdjacentHTML('afterend', values)
    this.handlerCategorioesOfPage();
  };

  handlerCategorioesOfPage() {
    let links = document.querySelectorAll('#menu > div > ul > li a');

    links.forEach((element, index) => {
      element.addEventListener('click', async (_e) => {
        _e.preventDefault();
        if (_e.target.textContent === 'PÁGINA INICIAL' || _e.target.textContent === 'CONTATO') {
          this.pageInitialOrContact(_e.target.textContent);
        } else {
          this.getCategoriesForId(element.dataset.id, _e.target.textContent);
        }
      });
    });
  };

  renderCategory(products, titlePage) {
    let main = document.querySelector('section .wrapper');
    main.innerHTML = '';
    let menuFilter = document.querySelector('#menu2');
    let cardsHTML = ``;
    let titleCategory = `<h2>${titlePage}</h2>`;
    let filters = `
    <nav id="menu2">
    <div class="box-categoria">
    <h2>Filtre Por</h2>
    <br>
    <h3>Categorias</h3>
    <br>
    <ul>
        <li><a href="">Roupas</a></li>
        <li><a href="">Sapatos</a></li>
        <li><a href="">Acessórios</a></li>
    </ul>
    <br>
    <h3>Cores</h3>
    <br>
    <h3>Tipo</h3>
    <ul>
        <li><a href="">Corrida</a></li>
        <li><a href="">Caminhada</a></li>
        <li><a href="">Casual</a></li>
        <li><a href="">Social</a></li>
    </ul>
    </div>
    </nav>`;

    products.items.map((value) => {
      cardsHTML += `\n 
      <div class="col-3">
        <div class="box-image">
            <img src="${value.image}" alt="${value.name}" title="${value.name}">
        </div>
          <h3 class="txtcenter">${value.name}</h3>
          <h3 class="txtcenter">${value.price}</h3>
          <div class="txtcenter">
              <div class="btn"> COMPRAR</div>
          </div>
      </div>
      `
    });

    if (menuFilter === null) {
      main.insertAdjacentHTML('beforebegin', filters)
    };

    main.insertAdjacentHTML('afterbegin', titleCategory)
    main.insertAdjacentHTML('beforeend', cardsHTML);

  }

  pageInitialOrContact(page) {
    let main = document.querySelector('section .wrapper');
    main.innerHTML = '';
    let htmlPage = '';
    let menuFilter = document.querySelector('#menu2');

    if (menuFilter !== null) {
      menuFilter.innerHTML = "";
    }

    if (page === 'PÁGINA INICIAL') {
      htmlPage = ` <h1 class="txtcenter">Seja bem vindo à Nossa Loja de Calçados!</h1>`
    } else {
      htmlPage = `
      <h1 class="txtcenter">Entre em contato através dos telefones ou e-mail:</h1>
      <div class="col-6">
          <strong> 11-98679-8238</strong>
          <br>
          <strong> matheus.buriti@hotmail.com</strong>
      </div>`
    }
    main.insertAdjacentHTML('afterbegin', htmlPage);
  }

  componentBuild() {
    this.getAllCategories('list');
  };

}

new Render();