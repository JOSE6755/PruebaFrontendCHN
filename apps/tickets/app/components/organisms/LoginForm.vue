<script setup lang="ts">
import { userAuthStore } from "../../stores/users";
import Alert from "../atoms/Alert.vue";
import FormField from "../molecules/FormField.vue";
import { loginSchema } from "utils";
const correo = ref("");
const contrasenia = ref("");
const errorMessage = ref("");
const isLoading = ref(false);
const authStore = userAuthStore();
async function submit() {
  isLoading.value = true;
  errorMessage.value = "";
  const isValid: boolean = await validateForm();
  if (!isValid) {
    console.log("adois2");
    isLoading.value = false;
    return;
  }
  setTimeout(() => {
    if (authStore.login(correo.value, contrasenia.value)) {
      navigateTo("/projects");
      errorMessage.value = "";
    } else {
      errorMessage.value = "Correo o contraseña incorrectos";
    }
    isLoading.value = false;
  }, 3000);
}

async function validateForm(): Promise<boolean> {
  try {
    await loginSchema.validate(
      {
        correo: correo.value,
        contrasenia: contrasenia.value,
      },
      { abortEarly: true }
    );
    return true;
  } catch (error) {
    errorMessage.value = error.message;
    return false;
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-4">
    <div
      class="w-full max-w-md bg-base-100 rounded-xl shadow-lg p-6 flex flex-col gap-6"
    >
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-base-content">Iniciar sesión</h2>
        <p class="text-sm text-base-content opacity-70">
          Accede a tu cuenta para continuar
        </p>
      </div>

      <div
        v-if="errorMessage"
        class="animate-fade-left animate-duration-300 animate-ease-in"
      >
        <Alert type="error" :message="errorMessage" />
      </div>

      <div class="flex flex-col gap-4">
        <FormField
          v-model="correo"
          label="Correo electrónico"
          placeholder="correo@ejemplo.com"
          type="email"
          help="Ingresa tu correo"
        />

        <FormField
          v-model="contrasenia"
          label="Contraseña"
          placeholder="••••••••"
          type="password"
          help="Ingresa tu contraseña"
          @keyup.enter="submit"
        />
      </div>

      <BaseButton
        class="btn-primary w-full mt-2"
        @click="submit"
        :loading="isLoading"
        :disabled="correo === '' ? true : contrasenia === '' ? true : false"
      >
        Continuar
      </BaseButton>
    </div>
  </div>
</template>
