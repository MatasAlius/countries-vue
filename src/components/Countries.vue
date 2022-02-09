<template>
  <div class="countries">
    <h2>ŠALYS <i class="fa fa-plus-circle" @click="addCountryButton"></i></h2>
    
    <div class="input">
      <input v-model="searchInput" type="text" placeholder="Paieška" v-on:keyup.enter="searchCountries"> <i class="fa fa-search" @click="searchCountries"></i>
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
    
    <div class="countriesFrom">
      <CountriesForm v-if="addCountryForm" :formType=1 :key=0>
        <template v-slot:title>Šalies pridėjimas</template>
        <template v-slot:buttonText>Pridėti</template>
      </CountriesForm>
      
      <CountriesForm v-if="editCountryForm" :formType=2 :countryInfo="this.country" :key="country.id">
        <template v-slot:title>Šalies redagavimas</template>
        <template v-slot:buttonText>Redaguoti</template>
      </CountriesForm>
    </div>  

    <div v-if="countries.length">
      <table>
        <tr>
          <th @click="sortCountries">Pavadinimas &#9660;</th>
          <th>Užimamas plotas</th>
          <th>Gyventojų skaičius</th>
          <th>Šalies tel. kodas</th>
          <th>Veiksmai</th>
        </tr>
        <tr v-for="(item) in countries" :key="item.id">
          <td @click="$router.push({name: 'Country', params: { id: item.id }})"><b><u>{{ item.attributes.name }}</u></b></td>
          <td>{{ item.attributes.area }}</td>
          <td>{{ item.attributes.population }}</td>
          <td>{{ item.attributes.phone_code }}</td>
          <td><button @click="deleteCountry(item.id)"><i class="fa fa-minus-circle"></i></button> | <button @click="editCountryButton(item.id)"><i class="fa fa-info-circle"></i></button></td>
        </tr>
      </table>

      <div class="pages" v-for="(page, index) in pageList" :key="index">
        <button @click="changePage(index)"><b v-if="currentPage==page">{{ page }}</b><u v-else>{{ page }}</u></button>
      </div>
    </div>
    <div v-else>
      <h4><b>Nėra šalių</b></h4>
    </div>

  </div>
</template>

<script>

import CountriesService from "../services/CountriesService";
import CountriesForm from "../components/CountriesForm.vue";

export default {
  name: 'Countries',
  components: {
    CountriesForm
  },

  data() {
    return {
      countries: [],
      currentPage: 1,
      pages: [],
      pageList: [],
      searchInput: '',
      sort: false,
      addCountryForm: false,
      editCountryForm: false,
      temp: 0,
      temp2: 0,
      country: [],
      dateFrom: '',
      dateTo: ''
    }
  },

  created() {
    CountriesService.getAll()
    .then(response => { this.countries = response.data.data; console.log(response); this.pages = response.data.meta; this.generatePages(); })
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
      this.temp2 = value;

      CountriesService.getAllParams(this.pageList[value], this.dateFrom, this.dateTo, this.searchInput)
      .then(response => { this.countries = response.data.data; console.log(response); this.pages = response.data.meta; this.generatePages(); })
      .catch((error) => {
        console.log(error);
      });
    },

    addCountryButton() {
      this.addCountryForm = !this.addCountryForm;
      this.editCountryForm = false;
      if (this.addCountryForm) {
        document.querySelector(".countriesFrom").scrollIntoView();
      }
    },

    deleteCountry(value) {
      let that = this;
      if (confirm("Ar tikrai norite ištrinti?")) {
        CountriesService.delete(value)
          .then(response => { 
            console.log(response.data);
            console.log("Ištrinta");
            alert("Ištrinta");
            that.$router.go(0);
          })
          .catch((error) => {
            console.log(error);
            alert("Nepavyko ištrinti šalies");
          });
      } else {
        console.log("Atšaukta");
      }
    },

    editCountryButton(value) {
      this.temp = value;
      this.country = this.countries.find(c1 => c1.id === value);
      this.editCountryForm = true;
      this.addCountryForm = false;
      document.querySelector(".countriesFrom").scrollIntoView();
    },

    searchCountries() {
      if (this.searchInput) {
        this.temp2 = 0;
        CountriesService.getAllParams(this.pageList[this.temp2], this.dateFrom, this.dateTo, this.searchInput)
          .then(response => { this.countries = response.data.data; console.log(response); this.pages = response.data.meta; this.generatePages(); })
          .catch((error) => {
            console.log(error);
            alert("Klaida su paieška");
          });
      }
      else {
        console.log("Neįvesta");
      }
      //this.searchInput = '';
    },

    sortCountries() {
      if (this.sort) {
        this.countries.sort((a,b) => a.attributes.name < b.attributes.name ? -1 : 1);
      }
      else {
        this.countries.sort((a,b) => a.attributes.name < b.attributes.name ? 1 : -1);
      }
      this.sort = !this.sort;
    },

    filterByDate() {
      this.temp2 = 0;
      CountriesService.getAllParams(this.pageList[this.temp2], this.dateFrom, this.dateTo, this.searchInput)
          .then(response => { this.countries = response.data.data; console.log(response); this.pages = response.data.meta; this.generatePages();})
          .catch((error) => {
            console.log(error);
            alert("Klaida su filtravimu");
      });
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
.countries {
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
