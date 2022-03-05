<template>
  <q-page class="flex flex-center row">
    <div class="absolute-top q-pa-md">
      <q-form @submit="pesquisaRastreio" class="q-gutter-md">
        <div class="q-gutter-y-sm row">
          <div
            class="col-xs-12 col-sm-8 col-md-8 col-lg-12"
            v-if="pesquisou == false"
          >
            <q-input
              v-model="codRastreio"
              outlined
              label="Código de Rastreio"
              maxlength="20"
              dense
              style="border: 30px; max-width: 500px"
            >
              <!-- <template v-slot:append>
                <q-icon
                  v-if="codRastreio"
                  name="save"
                  class="cursor-pointer"
                  @click="salvarCodigo()"
                />
              </template> -->
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-8 col-md-8 col-lg-5">
            <q-btn
              dense
              v-if="pesquisou == false"
              class="full-width"
              icon="search"
              label="Pesquisar"
              @click="pesquisaRastreio()"
              color="primary"
              style="max-width: 500px"
              :disable="!codRastreio"
            />
            <q-btn
              dense
              class="full-width q-mt-xs"
              icon="arrow_back"
              label="Retornar"
              outline
              @click="pesquisou = false"
              color="grey-8"
              style="max-width: 500px"
              v-if="pesquisou == true"
            />
          </div>
        </div>
      </q-form>
      <div
        style="max-width: 500px"
        class="q-pt-sm"
        v-if="pesquisou == false && this.codigosUser.length > 0"
      >
        <b class="text-grey-8">Histórico:</b>
        <q-list
          bordered
          v-for="(c, index) in codigosUser"
          :key="c"
          dense
          class="text-grey-9"
        >
          <q-item clickable v-ripple>
            <q-item-section @click="codHistorico(c)">{{ c }}</q-item-section>
            <q-item-section side
              ><q-icon
                name="delete"
                dense
                size="sm"
                @click="removeCodigo(c, index)"
            /></q-item-section>
          </q-item>
        </q-list>
        <q-btn
          color="red-5 q-mt-sm"
          icon="clear"
          outline
          label="Limpar Tudo"
          dense
          class="full-width"
          @click="limparHistorico()"
        />
      </div>
      <div style="max-width: 500px" class="q-pt-sm" v-if="pesquisou == true">
        <q-list bordered v-for="(e, index) in dadosEncomenda" :key="e" dense>
          <q-item>
            <q-item-section top avatar>
              <q-avatar>
                <q-img
                  :src="
                    e.codigo === 'PO'
                      ? 'https://rastreamento.correios.com.br/static/rastreamento-internet/imgs/agencia-cor.png'
                      : e.codigo === 'RO'
                      ? 'https://rastreamento.correios.com.br/static/rastreamento-internet/imgs/caminhao-cor.png'
                      : e.codigo === 'PAR' && e.tipo === '10'
                      ? 'https://rastreamento.correios.com.br/static/rastreamento-internet/imgs/verificar-documento-cor.png'
                      : e.codigo === 'PAR'
                      ? 'https://rastreamento.correios.com.br/static/rastreamento-internet/imgs/brazil.png'
                      : e.codigo === 'OEC'
                      ? 'https://rastreamento.correios.com.br/static/rastreamento-internet/imgs/pre-atendimento-cor.png'
                      : e.codigo === 'BDE'
                      ? 'https://rastreamento.correios.com.br/static/rastreamento-internet/imgs/logistica-reversa-cor.png'
                      : ''
                  "
                  :ratio="16 / 9"
                  spinner-color="primary"
                  spinner-size="82px"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="2" style="font-size: 13.5px">{{
                e.descricao
              }}</q-item-label>
              <q-item-label caption>{{ e.detalhe }}</q-item-label>
              <q-item-label caption>{{
                formataData(e.dtHrCriado)
              }}</q-item-label>
              <q-item-label
                v-if="e.codigo === 'OEC' && index == 0"
                style="font-size: 12px"
              >
                <span style="font-weight: bold">Local para retirada:</span
                ><br />
                Cidade: {{ e.unidade.endereco.cidade }} <br />
                CEP: {{ e.unidade.endereco.cep }}<br />
                Bairro: {{ e.unidade.endereco.bairro }}<br />
                Rua: {{ e.unidade.endereco.logradouro }}<br />
                N°: {{ e.unidade.endereco.numero }}
              </q-item-label>
              <q-item-label
                v-if="e.codigo === 'RO' && e.unidade.endereco.cidade"
                style="font-size: 12px"
              >
                De: {{ e.unidade.tipo }}<br />
                {{ e.unidade.endereco.cidade }} -
                {{ e.unidade.endereco.uf }}
                <br />
                Para: {{ e.unidadeDestino.tipo }}<br />
                {{ e.unidadeDestino.endereco.cidade }} -
                {{ e.unidadeDestino.endereco.uf }} <br />
              </q-item-label>
            </q-item-section>
            <!--
            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-icon name="star" color="yellow" />
            </q-item-section> -->
          </q-item>
        </q-list>
      </div>
      <br /><br />
    </div>
    <!-- <div class="absolute-bottom q-pa-md text-center">
      <span style="font-size: x-small"
        ><q-icon name="copyright" />Desenvolvido por
        <a href="https://github.com/iober" target="_blank">
          Iober Henrique da Cruz</a
        ></span
      >
    </div> -->
    <div>
      <q-list bordered v-for="d in dados" :key="d">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="bluetooth" />
          </q-item-section>
          <q-item-section>{{ d.nome }}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-footer bordered class="bg-white text-primary q-pl-sm">
      <span style="font-size: x-small"
        ><q-icon name="copyright" />Desenvolvido por
        <a href="https://github.com/iober" target="_blank">
          Iober Henrique da Cruz</a
        ></span
      >
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { date } from "quasar";
import { db } from "boot/firebase";
import { child, get, set, ref } from "firebase/database";
import { uid } from "quasar";
export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      codRastreio: "",
      dadosEncomenda: [],
      codigosUser: [],
      pesquisou: false,
      dados: [],
    };
  },
  created() {
    let uid1 = uid();
    console.log(uid1);
    // Example: 501e7ae1-7e6f-b923-3e84-4e946bff31a8
    get(child(db, `codigos`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.dados = snapshot.val();
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // db.ref("codigos").onSnapshot((snapshotChange) => {
    //   this.dados = [];
    //   firebaseDb.ref("/codigos").on("value", (snapshot) => {
    //     snapshot.forEach((childSnapshot) => {
    //       if (childSnapshot.val().email === user.email) {
    //         this.userOn = childSnapshot.val().displayName;
    //       }
    //     });
    //   });
    // });
    if (this.$q.localStorage.getItem("correios")) {
      this.codigosUser = this.$q.localStorage.getItem("correios");
    } else {
      this.$q.localStorage.set("correios", "");
    }
  },
  methods: {
    limparHistorico() {
      this.$q.localStorage.set("correios", "");
      this.codigosUser = [];
    },
    salvarCodigo() {
      this.codigosUser.push(this.codRastreio);
      this.$q.localStorage.set("correios", this.codigosUser);
      this.codigosUser = this.$q.localStorage.getItem("correios");
    },
    formataData(dt) {
      return date.formatDate(dt, "DD/MM/YYYY HH:MM");
    },
    codHistorico(cod) {
      this.codRastreio = cod;
      this.pesquisaRastreio();
      this.$q.loading.show({
        delay: 400, // ms
      });
    },
    removeCodigo(cod, index) {
      // this.codigosUser = this.codigosUser.splice(index, 1);
      var newArray = this.codigosUser.filter((item) => item !== cod);
      this.$q.localStorage.set("correios", newArray);
      this.codigosUser = this.$q.localStorage.getItem("correios");
    },
    // https://proxyapp.correios.com.br/v1/sro-rastro/LB493321394HK
    async pesquisaRastreio() {
      var novoCod = 0;
      this.$axios
        .get(
          `https://govbrpf.herokuapp.com/correios/${this.codRastreio.toUpperCase()}`
        )
        .then((response) => {
          this.dadosEncomenda = response.data;
          if (this.dadosEncomenda) {
            set(child(db, "codigos/" + this.codRastreio), {
              codigo: this.codRastreio,
              nome: "ziober",
            });
            this.pesquisou = true;
            var newArray = this.codigosUser.filter(
              (item) => item === this.codRastreio
            );
            if (newArray.length > 0) {
            } else {
              this.codigosUser.push(this.codRastreio);
              this.$q.localStorage.set("correios", this.codigosUser);
              this.codigosUser = this.$q.localStorage.getItem("correios");
            }
            this.$q.loading.hide();
          } else {
            this.$q.loading.hide();
            this.$q.notify({
              message: "Códigio digitado é inválido.",
              color: "negative",
              position: "top",
            });
          }
        })
        .catch(() => {
          console.log("erro");
        });
    },
  },
});
</script>
