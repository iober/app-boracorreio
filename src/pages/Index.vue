<template>
  <q-page class="flex flex-center row">
    <div class="absolute-top q-pa-md">
      <q-form @submit="verificarCodigo()" class="q-gutter-md">
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
            />
          </div>
          <div class="col-xs-12 col-sm-8 col-md-8 col-lg-5">
            <q-btn
              dense
              v-if="pesquisou == false"
              class="full-width"
              icon-right="local_shipping"
              label="Pesquisar Código"
              @click="verificarCodigo()"
              color="primary"
              outline
              style="max-width: 500px"
              :disable="!codRastreio"
            />
            <q-btn
              dense
              class="full-width q-mt-xs"
              icon="arrow_back"
              label="Retornar"
              @click="
                pesquisou = false;
                atualizar();
              "
              color="grey-7"
              style="max-width: 500px"
              v-if="pesquisou == true"
            />
          </div>
        </div>
      </q-form>
      <div style="max-width: 500px" class="q-pt-sm" v-if="pesquisou == false">
        <b class="text-grey-8">Histórico:</b>
        <div v-for="d in dados" :key="d">
          <q-list bordered dense class="text-grey-9" v-if="d.uid == uid">
            <q-item clickable="">
              <q-item-section avatar @click="codHistorico(d)">
                <q-icon color="primary" name="pin" />
              </q-item-section>

              <q-item-section @click="codHistorico(d)">
                <q-item-label class="text-weight-medium">{{
                  d.desc
                }}</q-item-label>
                <q-item-label class="text-grey-10" caption lines="1">{{
                  d.codigo
                }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon
                  name="delete"
                  dense
                  size="sm"
                  color="red-5"
                  @click="removeCodigo(d)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
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
          </q-item>
        </q-list>
      </div>
      <br /><br />
    </div>
    <q-dialog v-model="salvaCodigodlg" persistent>
      <q-card style="min-width: 300px">
        <q-card-section class="q-pt-lg">
          <div class="text-subtitle2 text-bold text-primary">
            Deseja salvar este código para consultas futuras?
          </div>
        </q-card-section>
        <q-card-section class="row items-center">
          <q-input
            v-model="desc"
            class="full-width"
            type="text"
            dense
            label="Descrição do rastreio"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            @click="salvarCodigo('N')"
            dense
            label="Não, Obrigado!"
            color="grey-10"
            outline
            v-close-popup
          />
          <q-btn
            @click="salvarCodigo('S')"
            dense
            :disable="!desc"
            label="Salvar"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
import { firebase } from "boot/firebase";
export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      salvaCodigodlg: false,
      codRastreio: "",
      dadosEncomenda: [],
      codigosUser: [],
      pesquisou: false,
      desc: "",
      dados: [],
      dadosCod: [],
      user: "",
      uid: "",
      codExiste: false,
    };
  },
  created() {
    this.user = this.$q.sessionStorage.getItem("name_c");
    this.uid = this.$q.sessionStorage.getItem("uid_c");
    this.atualizar();
  },
  methods: {
    async verificarCodigo() {
      this.salvaCodigodlg = true;
    },
    async atualizar() {
      firebase
        .database()
        .ref("codigos")
        .on("value", (snapshot) => {
          if (snapshot.exists()) {
            this.dados = snapshot.val();
            this.dadosCod = snapshot;
          } else {
            this.dados = [];
            this.dadosCod = [];
            console.log("No data available");
          }
        });
    },
    formataData(dt) {
      return date.formatDate(dt, "DD/MM/YYYY HH:MM");
    },
    codHistorico(cod) {
      this.codRastreio = cod.codigo;
      this.desc = cod.desc;
      this.pesquisaRastreio();
    },
    async removeCodigo(cod) {
      cod.desc1 = cod.desc;
      if (cod.desc === "") {
        cod.desc1 = cod.codigo;
      }
      this.$q
        .dialog({
          persistent: true,
          title: "Remover código?",
          html: true,
          message:
            "<span class='text-weight-medium'>Confirma a exclusão do rastreio:</span> <span class='text-bold text-weight-medium text-accent'>" +
            cod.desc1 +
            "</span>",
          cancel: {
            label: "CANCELAR",
            flat: true,
            dense: true,
          },
          ok: {
            dense: true,
            color: "red-7",
            label: "Excluir",
          },
        })
        .onOk(() => {
          var adaRef = firebase.database().ref("codigos/" + cod.codigo);
          adaRef
            .remove()
            .then(function () {
              console.log("Remove succeeded.");
            })
            .catch(function (error) {
              console.log("Remove failed: " + error.message);
            });
        })
        .onCancel(() => {
          // console.log('Cancel')
        });
    },
    // https://proxyapp.correios.com.br/v1/sro-rastro/LB493321394HK
    async salvarCodigo(param) {
      if (param === "S") {
        this.pesquisaRastreio(param);
      } else {
        this.desc = "";
        this.pesquisaRastreio(param);
      }
    },
    async pesquisaRastreio(param) {
      this.$q.loading.show({
        delay: 400, // ms
      });
      var novoCod = 0;
      this.$axios
        .get(
          `https://painelgov-api.iober.com.br/correios/${this.codRastreio.toUpperCase()}`
        )
        .then((response) => {
          this.dadosEncomenda = response.data;
          if (this.dadosEncomenda) {
            if (param === "S") {
              firebase
                .database()
                .ref("codigos/" + this.codRastreio)
                .set({
                  uid: this.uid,
                  codigo: this.codRastreio,
                  desc: this.desc,
                  user: this.uid,
                });
              this.pesquisou = true;
              this.desc = "";
            } else {
              this.pesquisou = true;
              this.desc = "";
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
