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
              
              <div v-if="settings.layout.product.list.attribute_widget_type === 1">
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
              </div>

              <div v-if="settings.layout.product.list.attribute_widget_type === 0" class="mt-2 mb-2">
                <select v-model="selectedOption">
                  <option v-for="(option, index) in this.product.attributes" :key="index" :value="option.id">
                    {{option.label}}
                  </option>
                </select>
              </div>
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
<style scoped src="./card.css"></style>