const modal = {
  open() {
    document.querySelector('.modal_overlay').classList.add('active');
  },
  close() {
    document.querySelector('.modal_overlay').classList.remove('active');
  },
};
