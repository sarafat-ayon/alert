<template>
  <section>
    <div
      class="
        h-full
        top-0
        right-0
        absolute
        bg-dark-100
        px-21
        login
        transition-all
        duration-2000
        ease-in-out
      "
      :class="[showLogin ? 'show' : 'hide', { 'animate-body': removeText }]"
    >
      <transition name="login_form">
        <div
          v-if="!loginFormTransition"
          class="absolute top-0 right-0 pr-5 pt-5 cursor-pointer"
          @click="$emit('hide')"
        >
          <fa class="text-orange-dark" :icon="['fas', 'times']" />
        </div>
      </transition>

      <div class="mt-16 h-auto">
        <transition name="login_form">
          <div v-if="!loginFormTransition">
            <div class="">
              <h3 class="text-orange-dark text-2xl">Log In</h3>
            </div>

            <div class="mt-5.8 w-full">
              <!-- <input
          class="outline-none px-5 rounded-full bg-orange-dark w-full h-10 placeholder-white placeholder-opacity-50"
          type="email"
          placeholder="Email"
        /> -->
              <div
                class="
                  w-full
                  flex flex-row
                  items-center
                  rounded-full
                  pl-5
                  bg-white
                "
              >
                <fa class="text-orange-dark mx-2" :icon="['fas', 'user']" />
                <input
                  v-model.trim="email"
                  class="
                    outline-none
                    rounded-full
                    bg-white
                    w-full
                    h-10
                    placeholder-orange-dark placeholder-opacity-50
                    text-orange-dark
                    pl-1
                    pr-5
                  "
                  type="email"
                  placeholder="Email"
                  @blur="$v.email.$touch()"
                />
              </div>
              <template v-if="$v.email.$error">
                <p v-if="!$v.email.required" class="text-red-500">
                  Email is Required
                </p>
                <p
                  v-else-if="!$v.email.email || !errorEmail"
                  class="text-red-500"
                >
                  Email is Invalid
                </p>
              </template>
              <p v-if="!errorEmail" class="text-red-500">Email is Invalid</p>
              <div
                class="
                  w-full
                  mt-5
                  flex flex-row
                  items-center
                  rounded-full
                  px-5
                  bg-white
                "
              >
                <fa class="text-orange-dark mx-2" :icon="['fas', 'lock']" />
                <input
                  v-model.trim="password"
                  class="
                    outline-none
                    rounded-full
                    bg-white
                    w-full
                    h-10
                    placeholder-orange-dark placeholder-opacity-50
                    text-orange-dark
                    pl-1
                  "
                  type="password"
                  placeholder="Password"
                  @blur="$v.password.$touch()"
                />
              </div>
              <template v-if="$v.password.$error">
                <p v-if="!$v.password.required" class="text-red-500">
                  Password is Required
                </p>
                <p v-else-if="!$v.password.minLength" class="text-red-500">
                  Password is Invalid
                </p>
              </template>
              <p v-if="!errorPassword" class="text-red-500">
                Password is Invalid
              </p>
              <div class="mt-5.8">
                <label class="inline-flex items-center">
                  <input
                    v-model="rememberMe"
                    type="checkbox"
                    class="
                      form-checkbox
                      w-5
                      h-5
                      bg-offwhite-300
                      border-offwhite-300
                      text-orange-midlight
                    "
                  />
                  <span class="ml-2 text-offwhite-300 text-lg"
                    >Remember me</span
                  >
                </label>
              </div>
              <p class="mt-1 mb-6 text-orange-dark text-lg">Forget Password</p>
            </div>
          </div>
        </transition>
      </div>
      <div
        class="text-center"
        :class="[{ 'login-button-container': removeText }]"
      >
        <button
          class="
            h-10
            text-white
            bg-orange-dark
            rounded-full
            border-none
            outline-none
            font-medium
            setup
            focus:outline-none
          "
          :class="[{ 'w-44': !removeText }, { 'login-button': removeText }]"
          :disabled="$v.$invalid"
          @click="logIn()"
        >
          <span :class="{ 'text-remove': removeText }">LogIn</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  props: {
    showLogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      removeText: false,
      email: '',
      password: '',
      rememberMe: false,
      loginButtonTransition: false,
      loginFormTransition: false,
      errorEmail: true,
      errorPassword: true,
      hideLogin: this.showLogin,
    }
  },
  validations: {
    email: {
      required,
      email,
      // async uniqueEmail(value) {
      //   if (value == '') {
      //     return true;
      //   } else {
      //     const response = await this.$axios.$post('users/check-email', {email: value})
      //   }
      // },
    },
    password: {
      required,
      minLength: minLength(8),
      // async uniquePassword(value) {
      //   if (value == '') {
      //     return true
      //   } else {
      //     const response = await this.$axios.$get('api-fake/users')
      //     const allData = response
      //     const alreadyExist = allData.findOne(
      //       (data) => data.password === value
      //     )
      //     if (alreadyExist) {
      //       return true
      //     } else {
      //       return false
      //     }
      //   }
      // },
    },
  },
  methods: {
    async logIn() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.email !== '') {
          try {
            await this.$auth.loginWith('local', {
              data: {
                username: this.email,
                password: this.password,
              },
            })
            this.loginButtonTransition = true
            this.loginFormTransition = true

            this.removeText = true
            setTimeout(() => {
              this.$router.push('/')
            }, 3000)
          } catch (e) {
            this.errorEmail = false
            this.errorPassword = false
          }
        }
      }
    },
    hideLoginComp() {
      this.hideLogin = false
    },
  },
}
</script>

<style lang="postcss" scoped>
@keyframes loginAnimation {
  from {
    @apply w-44;
  }
  to {
    @apply w-10;
  }
}

.login-button {
  animation-name: loginAnimation;
  animation-duration: 2s;
}

@keyframes loginAnimationMovePosition {
  from {
    opacity: 1;
    top: inherit;
  }
  to {
    opacity: 1;
    margin-top: -22rem;
  }
}

.login-button-container {
  animation-name: loginAnimationMovePosition;
  animation-duration: 2s;
  animation-delay: 2s;
}

.text-remove {
  opacity: 0;
  visibility: hidden;
  transition: opacity 1s;
}

@keyframes animateBG {
  from {
  }
  to {
    width: 100%;
  }
}

.animate-body {
  animation-name: animateBG;
  animation-duration: 2s;
  animation-delay: 5s;
}
</style>

<style lang="scss" scoped>
.setup {
  bottom: 530px;
}

.login_button-leave-active {
  transition: opacity 2s;
}

.login_button-leave-to {
  opacity: 0;
}

.login_form-leave-active {
  transition: opacity 3s;
}

.login_form-leave-to {
  opacity: 0;
}

.login {
  width: 450px;
  right: -450px;
}

.show {
  width: 450px;
  right: 0px;
}

.hide {
  width: 450px;
  right: -450px;
}

@media (max-width: 425px) {
  .login {
    width: 100%;
    right: -100%;
  }

  .show {
    width: 100%;
    right: 0px;
  }

  .hide {
    width: 100%;
    right: -100%;
  }
}
</style>
