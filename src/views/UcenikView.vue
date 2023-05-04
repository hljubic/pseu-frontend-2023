<template>
  <div class="home">
    <v-data-table :headers="stupci" :items="ucenici" :loading="ucitavam">
      <template v-slot:[`item.akcije`]="{ item }">
        <v-btn small color="red" class="white--text" @click="izbrisiUcenika(item.id)">Izbriši</v-btn>
      </template>
    </v-data-table>

    <v-text-field v-model="forma.ime" placeholder="Ime"></v-text-field>
    <v-text-field v-model="forma.datum_rodjenja" placeholder="Datum rođenja"></v-text-field>
    <v-text-field v-model="forma.jmbg" placeholder="JMBG"></v-text-field>
    <v-autocomplete :items="spolovi" v-model="forma.spol" placeholder="Spol"></v-autocomplete>
    <v-autocomplete :items="gradovi" item-text="naziv" item-value="id" v-model="forma.grad_id" placeholder="Grad"></v-autocomplete>
    <v-btn @click="dodajUcenika">Dodaj učenika</v-btn>

    <v-snackbar
        v-model="snackbar.model" right top
        :color="snackbar.color" timeout="1000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'UcenikView',
  data () {
    return {
      gradovi: [],
      ucenici: [],
      spolovi: [
        {text: 'Muški', value: 'musko'},
        {text: 'Ženski', value: 'zensko'}
      ],
      ucitavam: false,
      forma: {
        ime: '',
        datum_rodjenja: '',
        jmbg: '',
        spol: '',
        grad_id: '',
      },
      stupci: [
        {text: 'Ime', value: 'ime'},
        {text: 'Datum rođenja', value: 'datum_rodjenja'},
        {text: 'JMBG', value: 'jmbg'},
        {text: 'Spol', value: 'spol'},
        {text: 'Grad', value: 'grad.naziv'},
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
    this.dohvatiUcenike();
  },
  methods: {
    dohvatiUcenike: function () {
      this.ucitavam = true;

      this.axios.get('http://localhost:8000/api/ucenici/dohvati').then((response) => {
        this.ucenici = response.data;
      }).catch(() => {
        this.snackbar.model = true;
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri dohvatu učenika.';
      }).finally(() => {
        this.ucitavam = false;
      })
    },
    dohvatiGradove: function () {
      this.axios.get('http://localhost:8000/api/gradovi/dohvati').then((response) => {
        this.gradovi = response.data;
      })
    },
    dodajUcenika: function () {
      this.axios.post('http://localhost:8000/api/ucenici/dodaj', this.forma).then(() => {
        this.dohvatiUcenike()
        this.snackbar.color = 'green';
        this.snackbar.text = 'Uspješno dodan učenik.';
      }).catch(() => {
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri dodavanju učenika.';
      }).finally(() => {
        this.snackbar.model = true;
      })
    },
    izbrisiUcenika: function (id) {
      this.axios.get('http://localhost:8000/api/ucenici/izbrisi/' + id).then(() => {
        this.dohvatiUcenike();

        this.snackbar.color = 'green';
        this.snackbar.text = 'Uspješno izbrisan učenik.';
      }).catch(() => {
        this.snackbar.color = 'red';
        this.snackbar.text = 'Greška pri brisanju učenika.';
      }).finally(() => {
        this.snackbar.model = true;
      })
    },
  },
}
</script>
