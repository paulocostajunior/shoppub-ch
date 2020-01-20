export default {
  props: {
    product: Object,
    settings: Object,
  },
  data() {
    return {
      showDiv: {
        comprar: false
      },
      prod: {
        count: 1
      },
      imageGroup: {
        index: 1
      },
      prodImg : this.product.images[0].cover,
      i: 1,
      selectedOption: 1
    }
  },
  mounted: function() {
    this.options = this.product.attributes.map(item => {
      return {
        value: item.id,
        text: item.label
      }
    })
    this.options.push({value: null, text: 'selecione uma opção.'})

    this.product.attributes.map((item, index) => {
      return this.product.attributes[index] = {
        id: item.id,
        label: item.label,
        state: false
      }
    })

    this.product.related_products.map((item, index) => {
      return this.product.related_products[index] = {
        id: item.id,
        title: item.title,
        image: item.image,
        displayGroup: this.displayGroupIndex(index, this.i)
      }
    });
  },
  methods: {
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    selectLabel: function (selectedButtonId) {
      this.product.attributes.forEach((item, index) => {
        if(item.id !== selectedButtonId) {
          this.product.attributes[index].state = false;
          this.$set(this.product.attributes, index, this.product.attributes[index]);
        } else {
          this.product.attributes[index].state = true;
          this.$set(this.product.attributes, index, this.product.attributes[index]);
        }
      });
    },
    toggleComprar(bool) {
      let showComprar
      if (bool === true) {
        showComprar = true;
      } else {
        showComprar = false;
      }
      this.$set(this.showDiv, 'comprar', showComprar);
    },
    sumProd() {
      if (this.prod.count < this.product.availability.quantity) {
        return this.prod.count++;
      } else {
        alert(`Temos ${this.product.availability.quantity} quantidades no estoque`);
      }
        
    },
    subProd() {
      if (this.prod.count <= 1) {
        alert('Não é possível selecionar menos que um produto.');
      } else {
        return this.prod.count --;
      }
    },
    mouseEnterPhoto() {
      this.prodImg = this.product.images[0].hover;
    },
    mouseLeavePhoto() {
      this.prodImg = this.product.images[0].cover;
    },
    displayGroupIndex(index, i) {
      
      if((index+1)%3 === 0) {
        this.i += 1;
      }
        return i;
    },
    showNextImageGroup() {
      return this.imageGroup.index++;
    },
    showPreviousImageGroup() {
      return this.imageGroup.index--;
    }
  }
}