<template>
  <div class="home">
    <v-data-table :headers="stupci" :items="gradovi" :loading="ucitavam">
      <template v-slot:[`item.akcije`]="{ item }">
        <v-btn small color="red" class="white--text" @click="izbrisiGrad(item.id)">Izbriši</v-btn>
      </template>
    </v-data-table>

    <v-text-field v-model="forma.naziv" placeholder="Naziv"></v-text-field>
    <v-text-field v-model="forma.pb" placeholder="P. broj"></v-text-field>
    <v-btn @click="dodajGrad">Dodaj grad</v-btn>

    <v-snackbar
        v-model="snackbar.model" right top
        :color="snackbar.color" timeout="1000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'GradView',
  data () {
    return {
      gradovi: [],
      ucitavam: false,
      forma: {
        naziv: '',
        pb: ''
      },
      stupci: [
        {text: 'Naziv', value: 'naziv'},
        {text: 'Poštanski broj', value: 'postanski_broj'},
        {text: 'Akcije', value: 'akcije'}
      ],
      snackbar: {
        model: false,
        color: '',
        text: ''
      },
    }
  },
  created() {
    this.dohvatiGradove();
  },
  methods: {
    dohvatiGradove: function () {
      this.ucitavam = true;

      this.axios.get('http://localhost:8000/api/gradovi/dohvati').then((response) => {
        this.gradovi = response.data;
      }).catch(() => {
        this.snackbar.model = true;
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri dohvatu gradova.';
      }).finally(() => {
        this.ucitavam = false;
      })
    },
    dodajGrad: function () {
      this.axios.post('http://localhost:8000/api/gradovi/dodaj', this.forma).then(() => {
        this.dohvatiGradove()
        this.snackbar.color = 'green';
        this.snackbar.text = 'Uspješno dodan grad.';
      }).catch(() => {
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri dodavanju grada.';
      }).finally(() => {
        this.snackbar.model = true;
        this.ucitavam = false;
      })
    },
    izbrisiGrad: function (id) {
      this.axios.get('http://localhost:8000/api/gradovi/izbrisi/' + id).then(() => {
        this.dohvatiGradove();

        this.snackbar.color = 'green';
        this.snackbar.text = 'Uspješno izbrisan grad.';
      }).catch(() => {
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri brisanju grada.';
      }).finally(() => {
        this.snackbar.model = true;
        this.ucitavam = false;
      })
    },
  },
}
</script>
