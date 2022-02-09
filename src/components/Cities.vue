<template>
  <div class="cities">
    <h2>{{ countryName }} - Miestai <i class="fa fa-plus-circle" @click="addCityButton"></i></h2>
    
    <div class="input">
      <input v-model="searchInput" type="text" placeholder="Paieška" v-on:keyup.enter="searchCities"> <i class="fa fa-search" @click="searchCities"></i>
    </div>
    <div class="listBtn">
      <button @click="$router.go(0)"><i class="fa fa-list"></i> Pradinis sąrašas</button><br>
    </div> 
    <div class="dateForm">
      <form @submit="filterByDate" @submit.prevent>
        <label>
          Data nuo:
          <input type="date" v-model="dateFrom">
        </label>
        <label>
          Data iki:
          <input type="date" v-model="dateTo">
        </label>
        <button id="filter"><i class="fa fa-filter"></i> Filtruoti</button>
      </form>
    </div>
    <br>
    
    <AddEditForm v-if="showModal&&addCityForm" @close="showModal = false" @formResults="addCity" :formType=1 :mode=1 :key=0>
      <template v-slot:title>Miesto pridėjimas</template>
      <template v-slot:input1>Pavadinimas:</template>
      <template v-slot:input2>Užimamas plotas:</template>
      <template v-slot:input3>Gyventojų skaičius:</template>
      <template v-slot:input4>Miesto pašto kodas:</template>
      <template v-slot:buttonText>Pridėti</template>
    </AddEditForm>

    <AddEditForm v-if="showModal&&editCityForm" @close="showModal = false" @formResults="editCity" :formType=2 :cityInfo="this.city" :mode=1 :key="city.id">
      <template v-slot:title>Miesto redagavimas</template>
      <template v-slot:input1>Pavadinimas:</template>
      <template v-slot:input2>Užimamas plotas:</template>
      <template v-slot:input3>Gyventojų skaičius:</template>
      <template v-slot:input4>Miesto pašto kodas:</template>
      <template v-slot:buttonText>Redaguoti</template>
    </AddEditForm>

    <div v-if="cities.length">
      <table>
        <tr>
          <th @click="sortCities">Pavadinimas &#9660;</th>
          <th>Užimamas plotas</th>
          <th>Gyventojų skaičius</th>
          <th>Miesto pašto kodas</th>
          <th>Veiksmai</th>
        </tr>
        <tr v-for="(item) in cities" :key="item.id">
          <td><b>{{ item.attributes.name }}</b></td>
          <td>{{ item.attributes.area }}</td>
          <td>{{ item.attributes.population }}</td>
          <td>{{ item.attributes.postal_code }}</td>
          <td><button @click="deleteCity(item.id)"><i class="fa fa-minus-circle"></i></button> | <button @click="editCityButton(item.id)"><i class="fa fa-info-circle"></i></button></td>
        </tr>
      </table>

      <div class="pages" v-for="(page, index) in pageList" :key="index">
        <button @click="changePage(index)"><b v-if="currentPage==page">{{ page }}</b><u v-else>{{ page }}</u></button>
      </div>
    </div>
    <div v-else>
      <h4><b>Nėra miestų</b></h4>
    </div>

  </div>
</template>

<script>

import CountriesService from "../services/CountriesService";
import CitiesService from "../services/CitiesService";
import AddEditForm from "./AddEditForm.vue";

export default {
  name: 'Cities',
  components: {
    AddEditForm
  },

  data() {
    return {
      countryName: 'Šalis',
      country: [],
      cities: [],
      currentPage: 1,
      pages: [],
      pageList: [],
      searchInput: '',
      sort: false,
      addCityForm: false,
      editCityForm: false,
      temp: 0,
      temp2: 0,
      city: [],
      dateFrom: '',
      dateTo: '',
      showModal: false
    }
  },
  created() {
    CountriesService.get(this.$route.params.id)
      .then(response => { this.country = response.data.data; console.log(response); this.countryName = this.country.attributes.name; })
      .catch((error) => {
            console.log(error);
    });
    CitiesService.getAll(this.$route.params.id)
      .then(response => { this.cities = response.data.data; console.log(response); this.pages = response.data.meta; this.generatePages(); })
      .catch((error) => {
            console.log(error);
    });
  },
 
  methods: {
    generatePages() {
      this.currentPage = this.pages.current_page; 

      this.pageList = Array.from({length: this.pages.last_page}, (_, i) => i + 1);
      console.log(this.pageList);
    },

    changePage(value) {
      console.log(this.pageList[value]);

      CitiesService.getAllParams(this.$route.params.id, this.pageList[value], this.dateFrom, this.dateTo, this.searchInput)
      .then(response => { this.cities = response.data.data; console.log(response); this.pages = response.data.meta; this.generatePages(); })
      .catch((error) => {
        console.log(error);
      });
    },

    addCityButton() {
      this.addCityForm = !this.addCityForm;
      this.editCityForm = false;
      this.showModal = true;
    },

    deleteCity(value) {
      let that = this;
      if (confirm("Ar tikrai norite ištrinti?")) {
        CitiesService.delete(this.$route.params.id, value)
          .then(response => {
            console.log(response.data);
            console.log("Ištrinta");
            alert("Ištrinta");
            that.$router.go(0);
          })
          .catch((error) => {
            console.log(error);
            alert("Nepavyko ištrinti miesto");
          });
      } else {
        console.log("Atšaukta");
      }
    },

    editCityButton(value) {
      this.temp = value;
      this.city = this.cities.find(c1 => c1.id === this.temp);
      this.editCityForm = true;
      this.addCityForm = false;
      this.showModal = true;
    },

    searchCities() {
      if (this.searchInput) {
        this.temp2 = 0;
        CitiesService.getAllParams(this.$route.params.id, this.pageList[this.temp2], this.dateFrom, this.dateTo, this.searchInput)
          .then(response => { this.cities = response.data.data; console.log(response); this.pages = response.data.meta; this.generatePages();})
          .catch((error) => {
            console.log(error);
            alert("Klaida su paieška");
          });
      }
      else {
        console.log("Neįvesta");
      }
    },

    sortCities() {
      if (this.sort) {
        this.cities.sort((a,b) => a.attributes.name < b.attributes.name ? -1 : 1);
      }
      else {
        this.cities.sort((a,b) => a.attributes.name < b.attributes.name ? 1 : -1);
      }
      this.sort = !this.sort;
    },

    filterByDate() {
      this.temp2 = 0;
      CitiesService.getAllParams(this.$route.params.id, this.pageList[this.temp2], this.dateFrom, this.dateTo, this.searchInput)
          .then(response => { this.cities = response.data.data; console.log(response); this.pages = response.data.meta; this.generatePages();})
          .catch((error) => {
            console.log(error);
            alert("Klaida su filtravimu");
      });
    },

    addCity(results) {
      console.log('Add city');
      console.log(results);
      let that = this;
      CitiesService.add(this.$route.params.id, {
          data: {
            attributes: {
                name: results.name,
                area: results.area,
                population: results.population,
                postal_code: results.postal_code
            }
          }
      })
      .then(function (response) {
          console.log(response.data);
          console.log("Pridėta");
          alert("Pridėtas " + results.name);
          that.$router.go(0);
      })
      .catch(function (error) {
          console.log(error);
          that.errorAlert(error,'pridėti');
      });
    },

    editCity(results) {
      console.log('Edit city');
      let that = this;
      CitiesService.update(this.$route.params.id, this.city.id, {
        data: {
          attributes: {
            name: results.name,
            area: results.area,
            population: results.population,
            postal_code: results.postal_code
          }
        }
      })
      .then(function (response) {
        console.log(response.data);
        console.log("Atnaujintas");
        alert("Atnaujintas " + results.name);
        that.$router.go(0);
      })
      .catch(function (error) {
        console.log(error);
        that.errorAlert(error,'atnaujinti');
      });
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
h2 {
  text-align: left;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #0054a5;
}
.cities {
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 10px;
}
table, th, td {
  padding: 5px;
  border: 1px solid black;
  border-collapse: collapse;
}
.pages {
  padding-top: 10px;
  padding-right: 2px;
  display: inline-block;
}
.input {
  text-align: left;
}
input {
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
.form {
  text-align: left;
  padding: 20px;
}
#filter {
  margin: 10px;
}
</style>
