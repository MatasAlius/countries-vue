<template>
  <div class="addeditform">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-exit">
              <button @click="$emit('close')"><i class="fa fa-remove"></i> </button>
            </div>
            <div class="modal-header">
              <h3><b><slot name="title">Forma</slot></b></h3>
            </div>
            <div class="modal-body">
              <slot name="body">
                <form @submit="addEdit" @submit.prevent>
                  <label class="label"><slot name="input1"></slot></label><br>
                  <input v-model="name" type="text" placeholder="Pavadinimas" required><br>
                  <label class="label"><slot name="input2"></slot></label>
                  <input v-model="area" type="number" min="0" step="0.01" placeholder="Plotas" required><br>
                  <label class="label"><slot name="input3"></slot></label>
                  <input v-model="population" type="number" min="0" step="1" placeholder="Gyventojų skaičius" required><br>
                  <label class="label"><slot name="input4"></slot></label>
                  <input v-if="mode == 1" v-model="postalCode" type="text" placeholder="Pašto kodas" required>
                  <input v-else v-model="phoneCode" type="text" placeholder="Šalies tel. kodas" required><br>
                  <button v-if="formType == 1"><i class="fa fa-plus-circle"></i> Pridėti</button>
                  <button v-else><i class="fa fa-pencil-square"></i> Redaguoti</button>
                </form>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'AddEditForm',
  props: {
    formType: Number,
    cityInfo: {
      Type: Object,
      default: null
    },
    countryInfo: {
      Type: Object,
      default: null
    },
    mode: Number
  },

  data() {
    return {
      name: '',
      area: '',
      population: '',
      postalCode: '',
      phoneCode: '',
      showModal: false
    }
  },

  mounted() {
    console.log(this.countryInfo);
    console.log(this.cityInfo);
    if (this.mode == 1) {
      if (this.formType == 1) {
        this.name = '';
        this.area = '';
        this.population = '';
        this.postalCode = '';
      }
      else {
        this.name = this.cityInfo.attributes.name;
        this.area = this.cityInfo.attributes.area;
        this.population = this.cityInfo.attributes.population;
        this.postalCode = this.cityInfo.attributes.postal_code;
      }
    }
    else {
      if (this.formType == 1) {
        this.name = '';
        this.area = '';
        this.population = '';
        this.phoneCode = '';
      }
      else {
        this.name = this.countryInfo.attributes.name;
        this.area = this.countryInfo.attributes.area;
        this.population = this.countryInfo.attributes.population;
        this.phoneCode = this.countryInfo.attributes.phone_code;
      }
    }
    
  },

  methods: {
    
    addEdit() {
      if (this.mode == 1) {
        var results = {
          name: this.name,
          area: this.area,
          population: this.population,
          postal_code: this.postalCode
        }
        this.$emit('formResults',results);
      }
      else {
        var results2 = {
          name: this.name,
          area: this.area,
          population: this.population,
          phone_code: this.phoneCode
        }
        this.$emit('formResults',results2);
      }
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
}

.modal-exit {
  padding-top: 10px;
  text-align: right;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
