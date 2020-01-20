<template>

	<div id="card-content" v-on:mouseleave="toggleComprar(false)">
    <b-card class="mb-2 ml-4">

    <div class="container">
        <div v-if="settings.layout.product.list.show_favorite_widget"> 
          <div class="tag-star"><b-icon-star></b-icon-star></div>
        </div>
        <div v-if="settings.layout.product.list.show_tags">
          <div v-for="(tag, index) in product.tags" :key="`${index}`">
            <div v-if="tag.label==='Novo'">
              <div class="tag-novo">{{tag.label}}</div>
            </div>
            <div v-else>
              <div class="tag-off">{{tag.label}}</div>
            </div>
          </div>
        </div>
        <img :src="prodImg" v-on:mouseenter="mouseEnterPhoto()" v-on:mouseleave="mouseLeavePhoto()">
    </div>

      <b-card-text>

        <p class="font-title mt-2">{{product.title}}</p>

        <div v-if="settings.layout.product.list.show_campaign_tags">
          <b-button class="button-size button-frete mr-2">Frete Grátis</b-button>
          <b-button class="button-size button-a-vista">50% à vista</b-button>
        </div>

        <div class="mt-3"> 
          <div>
            <span class="main-text discount-color">de <strike>R${{formatPrice(product.pricing.total_value_from)}}</strike></span>
            por <span class="price-color main-price"><strong>R${{formatPrice(product.pricing.total_value)}}</strong></span>
          </div>

          <div>
            <span class="installment-price">ATÉ </span>
            <span class="main-text price-color">{{formatPrice(product.pricing.installments.quantity)}}X </span>
            <span class="installment-price">DE </span>
            <span class="main-text price-color">R${{formatPrice(product.pricing.installments.installment_value)}}</span>
          </div>

          <div>
            <span class="price-color main-price"><strong>R${{formatPrice(product.pricing.installments.total_value)}} </strong></span>
            <span style="main-text">label <span class="price-color">5%</span> à vista</span>
          </div>
        </div>

        <div id="hover-content">

          <div v-if="showDiv.comprar === false">
            <b-button-group class="mt-2 mb-2">
              <button
                class="attribute-font mr-2"
                v-for="(attribute, idx) in product.attributes"
                :key="idx"
                :class="[attribute.state ? 'attribute-selected' : 'attribute-not-selected']"
                v-on:click="selectLabel(attribute.id)"
                variant="primary"
              >
                {{ attribute.label }}
              </button>
            </b-button-group>

            <div v-if="settings.layout.product.list.show_related_products">
              <div class="display-flex-center">
                <div v-if="imageGroup.index >= 2" v-on:click="showPreviousImageGroup()" class="arrow-related-left">
                  <b-icon-arrow-left-short></b-icon-arrow-left-short>
                </div>
                  <div 
                    v-for="(related, index) in this.product.related_products"
                    :key="index"
                  >
                  <div v-if="imageGroup.index === related.displayGroup">
                    <img class="img-related mr-2" :src=related.image width="50px" height="50px" style="border: 1px solid #888888"/>
                  </div>

                </div>

                <div 
                  v-if="imageGroup.index < this.product.related_products[this.product.related_products.length-1].displayGroup"
                  v-on:click="showNextImageGroup()" 
                  class="arrow-related-right"
                >
                  <b-icon-arrow-right-short>
                  </b-icon-arrow-right-short>
                </div>
              </div>
            </div>
            
            <div class="button-comprar-ver mt-2">
              <b-button v-on:click="toggleComprar(true)" id="button-comprar" class="mr-2">COMPRAR</b-button>
              <b-button id="button-ver">VER</b-button>
            </div>
          </div>

          <div class="mt-2" v-if="showDiv.comprar === true">
            <b-button id="input-quantity" class="mr-2">{{this.prod.count}}</b-button>
            <b-button-group vertical class="mr-2">
              <b-button class="arrow-box mb-2" v-on:click="sumProd">+</b-button>
              <b-button class="arrow-box" v-on:click="subProd">-</b-button>
            </b-button-group>           
            <b-button id="add-button">ADICIONAR</b-button>
          </div>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script src="./card.js"></script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

/* display flex */
.display-flex-center {
  display: flex; 
  justify-content: center;
}

/* title */
.font-title {
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}

/* buttons */
.button-size {
  height: 26px;
  width: 98px;
  border: none;
  font-size: 11px;
  font-family: 'Roboto', sans-serif;
}
.button-frete {
  background-color:#E05618;
}
.button-frete:hover {
  background-color:#E05618;
}
.button-frete:focus {
  background-color:#E05618;
}
.button-a-vista {
  background-color:#679B0C;
}
.button-a-vista:hover {
  background-color:#679B0C;
}

/* pricing */
.main-text {
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}
.installment-price {
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
}
.main-price {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
}  
.price-color {
  color: #F45400;
}
.discount-color {
  color:#888888;
}

/* img tags */
.tag-star {
  font-size: 35px;
  float: left;
  position: relative;
  left: -10px;
  top: -5px;
  z-index: 1000;
  font-weight: bold;
}
.tag-novo {
  font-size: 10px;
  float: left;
  position: absolute;
  left: 265px;
  top: 5px;
  z-index: 1000;
  background-color: #F45400;
  padding-top: 15px;
  height: 50px;
  width: 50px;
  color: #FFFFFF;
  font-weight: bold;
  cursor: default;
}
.tag-off {
  font-size: 10px;
  float: left;
  position: absolute;
  left: 265px;
  top: 60px;
  z-index: 1000;
  background-color: #FF8900;
  padding: 13px;
  height: 50px;
  width: 50px;
  color: #FFFFFF;
  font-weight: bold;
  cursor: default;
}
.container {
  border: 1px solid #DDDDDD;
  position: relative;
}

/* hover content */
#hover-content {
  display:none;
}
#card-content:hover #hover-content {
  display:block;
}

/* attributes inside hover content */
.attribute-button {
  height: 32px;
  width: 33px;
}
.attribute-font {
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
}
.attribute-not-selected {
  background-color: white;
  border:1px solid #888888;
  color: #444444;
  height: 32px;
  width: 33px;
}
.attribute-not-selected:hover {
  background-color: #7AB11B;
  color:white;
  height: 32px;
  width: 33px;
}
.attribute-selected {
  background-color: #7AB11B;
  color:white;
  height: 32px;
  width: 33px;
}

/* buttons inside hover content */
.button-comprar-ver {
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
}
#button-comprar {
  height: 36px;
  width: 183px;
  border: none;
  background-color: #7AB11B;
}
#button-ver {
  height: 36px;
  width: 102px;
  border: none;
  background-color: #906378;
}

/* input inside hover content */
#input-quantity {
  height: 53px; 
  width: 53px;
  border: 1px solid #888888;
  background-color: white;
  color: #444444;
  padding: 15px;
  cursor: default;
}
#add-button {
  height: 53px;
  width: 184px;
  font-size: 16px;
  background-color:#679B0C;
  color:white;
  padding:15px;
}
.arrow-box {
  height: 23px;
  width: 32px;
  background-color: #707070;
  color: white;
  font-size: 14px;
  border-radius: 0px;
  padding-top: 1px;
}

/* related */
.img-related {
  background-color: none;
  height: 50px;
  width: 50px;
}
.img-related:hover {
  cursor: pointer;
}
.arrow-related-right {
  font-size: 35px;
  text-align:right;
}
.arrow-related-left {
  font-size: 35px;
  text-align:left;
}
</style>