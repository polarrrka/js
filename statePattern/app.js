const PageState = function() {
  let currentState = new homeState(this);

  this.start = function() {
    this.change(new homeState);
  }
  this.change = function(state) {
    currentState = state;
  }
};

const homeState = function(page) {
  document.querySelector('#heading').textContent = null;
  document.querySelector('#heading').innerHTML = `
    <div class="jumbotron">
    <h1 class="display-4">Hello, world!</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </div>
    `;
};

const aboutState = function(page) {
  document.querySelector('#heading').textContent = 'About us!'
    document.querySelector('#heading').innerHTML = `
      <p>this is the about page</p>
    `;
};

const contactState = function(page) {
  document.querySelector('#heading').textContent = 'Contact us!'
    document.querySelector('#heading').innerHTML = `
      <form>
        <div class="form-group">
          <label>name</label>
          <input type="text" class="form-control">
        </div>
        <div class="form-group">
          <label>e-mail</label>
          <input type="email" class="form-control">
          <button class="btn btn-primary">submit</button>
      </form>
      `;
}; 

const page = new PageState();

page.start();

const home = document.querySelector('#home'), 
      about = document.querySelector('#about'),
      contact = document.querySelector('#contact');

home.addEventListener('click', (e) => {
  page.change(new homeState);
  e.preventDefault();
});

about.addEventListener('click', (e) => {
  page.change(new aboutState);
  e.preventDefault();
});

contact.addEventListener('click', (e) => {
  page.change(new contactState);
  e.preventDefault();
});