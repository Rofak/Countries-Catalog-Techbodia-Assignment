<template>
  <UContainer class="mt-10">
    <div>
      <UInput
        v-model="countryName"
        size="xl"
        placeholder="Enter Country Name"
        @input="onSearchByCountryName"
      />
    </div>
    <div class="mt-5">Sort by Country Name</div>
    <div class="mb-2 flex justify-between">
      <div>
        <UButton size="xl" class="mr-2" @click="onSortByCountryNameAsc"
          >Asc</UButton
        >
        <UButton size="xl" class="mx-2" @click="onSortByCountryNameDesc"
          >Desc</UButton
        >
      </div>
      <div>
        <UButton size="xl" class="mx-2">Previous</UButton>
        <UButton size="xl" class="mx-2">Next</UButton>
      </div>
    </div>
    <div class="grid grid-cols-4">
      <div v-for="(country, index) of countries" :key="index" class="mx-2 my-4">
        <div class="text-center">
          <img :src="country.flags.png" />
          <span
            class="hover:cursor-pointer"
            @click="onClickCountryName(country)"
            >{{ country.name.official }}</span
          >
        </div>
      </div>
    </div>
    <UModal v-model="isOpen">
      <div class="p-4 break-all">
        <img :src="currentCountry.flags.png" class="w-full h-full" />
        <div class="mt-5">
          <div>
            <span class="font-bold">Country Name:</span
            >{{ currentCountry.name.official }}
          </div>
          <div>
            <span class="font-bold">CCA2:</span>{{ currentCountry.cca2 }}
          </div>
          <div>
            <span class="font-bold">CCA3:</span>{{ currentCountry.cca3 }}
          </div>
          <div>
            <span class="font-bold">Native Country Name:</span
            >{{ getNativeName }}
          </div>
          <div>
            <span class="font-bold">Alternative Country Name:</span>
            {{ getAltSpellings }}
          </div>
          <div>
            <span class="font-bold">Country Calling Codes:</span
            >{{ getCountryIdd }}
          </div>
        </div>
      </div>
    </UModal>
  </UContainer>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import _ from "lodash";
import CountryService from "../service/country.service";

const service = new CountryService();
const countries: any = useState("countries", () => []);
const currentCountry: any = useState("currentCountry", () => {});
const countryName = useState("countryName", () => "");
const isOpen = useState("isOpen", () => false);
countries.value = await service.getListCountry();

const onSearchByCountryName = async ($event) => {
  countries.value = await service.searchByCountryName($event.target.value);
};

const onClickCountryName = (value) => {
  isOpen.value = true;
  currentCountry.value = value;
};

const getNativeName = computed(() => {
  const nativeName = currentCountry.value.name.nativeName;
  let countryNativeName = "";
  Object.keys(nativeName).forEach((key) => {
    countryNativeName = `${nativeName[key].official},${nativeName[key].common}`;
  });
  return countryNativeName;
});

const getAltSpellings = computed(() => {
  return _.join(currentCountry.value.altSpellings, ",");
});

const getCountryIdd = computed(() => {
  const iddRoot = currentCountry.value.idd.root;
  const suffixes = currentCountry.value.idd.suffixes;
  const idd = _.map(suffixes, (suffix) => `${iddRoot}${suffix}`);
  return _.join(idd, ",");
});

const onSortByCountryNameAsc = () => {
  countries.value = _.orderBy(countries.value, ["name.official"], "asc");
};

const onSortByCountryNameDesc = () => {
  countries.value = _.orderBy(countries.value, ["name.official"], "desc");
};
</script>
