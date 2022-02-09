<template>
  <div class="citiesform">
    <div class="form">
      <h4><b><slot name="title">Forma</slot></b></h4>
      <form @submit="addEditCity" @submit.prevent>
        <label class="label">Pavadinimas: </label>
        <input v-model="cityName" type="text" placeholder="Pavadinimas" required><br>
        <label class="label">Užimamas plotas: </label>
        <input v-model="cityArea" type="number" min="0" step="0.01" placeholder="Plotas" required><br>
        <label class="label">Gyventojų skaičius: </label>
        <input v-model="cityPopulation" type="number" min="0" step="1" placeholder="Gyventojų skaičius" required><br>
        <label class="label">Miesto pašto kodas: </label>
        <input v-model="cityPostalCode" type="text" placeholder="Pašto kodas" required><br>
        <button v-if="formType == 1"><i class="fa fa-plus-circle"></i> Pridėti</button>
        <button v-else><i class="fa fa-pencil-square"></i> Redaguoti</button>
      </form>
    </div>
    <slot></slot>
  </div>
</template>

<script>

import CitiesService from "../services/CitiesService";

export default {
  name: 'CitiesForm',
  props: {
    formType: Number,
    cityInfo: Object
  },

  data() {
    return {
      addCityForm: false,
      editCityForm: false,
      cityName: '',
      cityArea: '',
      cityPopulation: '',
      cityPostalCode: ''
    }
  },

  mounted() {
    if (this.formType == 1) {
      this.cityName = '';
      this.cityArea = '';
      this.cityPopulation = '';
      this.cityPostalCode = '';
    }
    else {
      this.cityName = this.cityInfo.attributes.name;
      this.cityArea = this.cityInfo.attributes.area;
      this.cityPopulation = this.cityInfo.attributes.population;
      this.cityPostalCode = this.cityInfo.attributes.postal_code;
    }
  },

  methods: {
    addCity() {
      console.log('Add city');
      let that = this;
      CitiesService.add(this.$route.params.id, {
          data: {
          attributes: {
              name: this.cityName,
              area: this.cityArea,
              population: this.cityPopulation,
              postal_code: this.cityPostalCode
          }
          }
      })
      .then(function (response) {
          console.log(response.data);
          console.log("Pridėta");
          alert("Pridėtas " + that.cityName);
          that.$router.go(0);
      })
      .catch(function (error) {
          console.log(error);
          that.errorAlert(error,'pridėti');
      });
    },

    editCity() {
      console.log(this.temp);
      console.log('Edit city');
      let that = this;
      CitiesService.update(this.$route.params.id, this.cityInfo.id, {
        data: {
          attributes: {
            name: this.cityName,
            area: this.cityArea,
            population: this.cityPopulation,
            postal_code: this.cityPostalCode
          }
        }
      })
      .then(function (response) {
        console.log(response.data);
        console.log("Atnaujintas");
        alert("Atnaujintas " + that.cityName);
        that.$router.go(0);
      })
      .catch(function (error) {
        console.log(error);
        that.errorAlert(error,'atnaujinti');
      });
    },
    
    addEditCity() {
      if (this.formType == 1) {
          this.addCity();
      }
      else {
          this.editCity();
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
      if (error.response.data.errors["data.attributes.postal_code"])
        text += "* įvestas netinkamas pašto kodas\n";
      
      alert("Nepavyko " + name + " miesto:\n" + text);
    }
  }
}
</script>

<style scoped>

</style>
