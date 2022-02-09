<template>
  <div class="countriesform">
    <div class="form">
      <h4><b><slot name="title">Forma</slot></b></h4>
      <form @submit="addEditCountry" @submit.prevent>
        <label class="label">Pavadinimas: </label>
        <input v-model="countryName" type="text" placeholder="Pavadinimas" required><br>
        <label class="label">Užimamas plotas: </label>
        <input v-model="countryArea" type="number" min="0" step="0.01" placeholder="Plotas" required><br>
        <label class="label">Gyventojų skaičius: </label>
        <input v-model="countryPopulation" type="number" min="0" step="1" placeholder="Gyventojų skaičius" required><br>
        <label class="label">Šalies tel. kodas: </label>
        <input v-model="countryPhoneCode" type="text" placeholder="Šalies tel. kodas" required><br>
        <button v-if="formType == 1"><i class="fa fa-plus-circle"></i> Pridėti</button>
        <button v-else><i class="fa fa-pencil-square"></i> Redaguoti</button>
      </form>
    </div>
    <slot></slot>
  </div>
</template>

<script>

import CountriesService from "../services/CountriesService";

export default {
  name: 'CountriesForm',
  props: {
    formType: Number,
    countryInfo: Object
  },

  data() {
    return {
      addCountryForm: false,
      editCountryForm: false,
      countryName: '',
      countryArea: '',
      countryPopulation: '',
      countryPhoneCode: ''
    }
  },

  mounted() {
    if (this.formType == 1) {
      this.countryName = '';
      this.countryArea = '';
      this.countryPopulation = '';
      this.countryPhoneCode = '';
    }
    else {
      this.countryName = this.countryInfo.attributes.name;
      this.countryArea = this.countryInfo.attributes.area;
      this.countryPopulation = this.countryInfo.attributes.population;
      this.countryPhoneCode = this.countryInfo.attributes.phone_code;
    }
  },

  methods: {
    addCountry() {
      console.log('Add country');
      let that = this;
      CountriesService.add({
          data: {
              attributes: {
                  name: this.countryName,
                  area: this.countryArea,
                  population: this.countryPopulation,
                  phone_code: this.countryPhoneCode
              }
          }
      })
      .then(function (response) {
          console.log(response.data);
          console.log("Pridėta");
          alert("Pridėta " + that.countryName);
          that.$router.go(0);
      })
      .catch(function (error) {
          console.log(error); 
          that.errorAlert(error,'pridėti');
      });
    },

    editCountry() {
      console.log(this.temp);
      console.log('Edit country');
      let that = this;
      CountriesService.update(this.countryInfo.id, {
        data: {
          attributes: {
            name: this.countryName,
            area: this.countryArea,
            population: this.countryPopulation,
            phone_code: this.countryPhoneCode
          }
        }
      })
      .then(function (response) {
        console.log(response.data);
        console.log("Atnaujintas");
        alert("Atnaujinta " + that.countryName);
        that.$router.go(0);
      })
      .catch(function (error) {
        console.log(error);
        that.errorAlert(error,'atnaujinti');
      });
    },
    
    addEditCountry() {
      if (this.formType == 1) {
          this.addCountry();
      }
      else {
          this.editCountry();
      }
    },
    
    errorAlert(error, name) {
      var text = "";
      if (error.response.data.errors["data.attributes.name"])
        text += "* įvestas netinkamas pavadinimas\n";
      if (error.response.data.errors["data.attributes.area"])
        text += "* įvestas netinkamas užimamas plotas\n";
      if (error.response.data.errors["data.attributes.population"])
        text += "* įvestas netinkamas gyventojų skaičius\n";
      if (error.response.data.errors["data.attributes.phone_code"])
        text += "* įvestas netinkamas šalies tel. kodas\n";
      
      alert("Nepavyko " + name + " šalies:\n" + text);
    }
  }
}
</script>

<style scoped>

</style>
