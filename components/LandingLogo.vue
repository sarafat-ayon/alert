<template>
  <section>
    <div
      v-if="$route.name === 'index'"
      class="
        logo-wrapper
        hidden
        md:block
        transition-all
        duration-500
        ease-in-out
      "
      :class="[
        showLogin || logoLeft || increaseIndex ? 'z-40' : 'z-20',
        showLogo ? 'fixed' : '',
      ]"
    >
      <router-link to="/" @click.native="closeStarterModal()">
        <svg
          id="landing-logo"
          xmlns="http://www.w3.org/2000/svg"
          class="
            sharpArchiveLogo
            absolute
            transition-all
            duration-1000
            cursor-pointer
          "
          :class="[
            isSticky ||
            headerWidth ||
            logoLeft ||
            increaseIndex ||
            starterMaximized
              ? 'logo-left'
              : 'logo-center',
            increaseIndex || starterMaximized ? 'logo-left_fullExpand' : '',

            showLogin || logoLeft || increaseIndex ? 'z-40' : 'z-20',
          ]"
          width="140"
          height="140"
          viewBox="0 0 160 168.21"
        >
          <defs>
            <style>
              .cls-1 {
                fill: #8e8e8e;
              }
              .cls-2 {
                fill: #8db22f;
              }
              .cls-3 {
                fill: #6e9c2e;
              }
              .cls-4 {
                fill: #a0c749;
              }
              .cls-5 {
                fill: #60822d;
              }
              .cls-6 {
                fill: #7d80bd;
              }
              .cls-7 {
                fill: #5e60a9;
              }
              .cls-8 {
                fill: #a5a0cf;
              }
              .cls-9 {
                fill: #5957a2;
              }
              .cls-10 {
                fill: #e89921;
              }
              .cls-11 {
                fill: #e4801d;
              }
              .cls-12 {
                fill: #eba83b;
              }
              .cls-13 {
                fill: #b76d1c;
              }
            </style>
          </defs>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <g id="SharpArchiveLogo">
                <g id="name">
                  <path
                    id="Path_2103"
                    data-name="Path 2103"
                    class="cls-1"
                    d="M21.88,124.15c-1.12-1.86-4.18-3.62-7.7-3.62-4.53,0-6.71,1.9-6.71,4.32,0,2.83,3.32,3.62,7.23,4.08,6.76.84,13.06,2.6,13.06,10.34,0,7.23-6.4,10.34-13.63,10.34-6.62,0-11.72-2-14.13-8L5.1,139c1.44,3.57,5.19,5.15,9.12,5.15s7.46-1.33,7.46-4.87c0-3.06-3.2-4.32-7.5-4.77-6.62-.79-12.74-2.55-12.74-9.83C1.44,118,8,115.25,14,115.2c5,0,10.29,1.44,12.74,6.45Z"
                  />
                  <path
                    id="Path_2104"
                    data-name="Path 2104"
                    class="cls-1"
                    d="M54.58,148.81V135.69H38.64v13.12H32.53V116.36h6.11V130H54.58V116.36h6.07v32.45Z"
                  />
                  <path
                    id="Path_2105"
                    data-name="Path 2105"
                    class="cls-1"
                    d="M89.41,142.64h-17l-2.78,6.12H63.05l14.54-32.44h6.67l14.55,32.44H92.14Zm-8.48-19.51-6,13.81H87Z"
                  />
                  <path
                    id="Path_2106"
                    data-name="Path 2106"
                    class="cls-1"
                    d="M130.31,148.76H123l-9.47-10.85h-5.88v10.85h-6.11v-32.5c5.14,0,10.28,0,15.43,0,7.64,0,11.67,5.15,11.67,10.75,0,4.45-2,8.95-8.2,10.2l9.82,11.08ZM107.71,122V132.4H117c3.89,0,5.55-2.6,5.55-5.19S120.86,122,117,122Z"
                  />
                  <path
                    id="Path_2107"
                    data-name="Path 2107"
                    class="cls-1"
                    d="M148.09,139.21h-9.17v9.55h-6.11V116.31c5.1,0,10.19,0,15.29,0,15.84,0,15.89,23,0,23m-9.17-5.61h9.17c7.83,0,7.78-11.5,0-11.5h-9.17Z"
                  />
                  <path
                    id="Path_2108"
                    data-name="Path 2108"
                    class="cls-1"
                    d="M10.47,168.07l-1.28-2.86H2.24L1,168.07H0l5.22-11.64h1l5.23,11.64Zm-1.63-3.7-3.12-7.09-3.13,7.09Z"
                  />
                  <path
                    id="Path_2109"
                    data-name="Path 2109"
                    class="cls-1"
                    d="M35.86,168.07H34.68l-4-4.41H27.48v4.41h-.9V156.43H31.7a3.59,3.59,0,0,1,3.82,3.37,2.17,2.17,0,0,1,0,.26,3.43,3.43,0,0,1-3.29,3.58,4,4,0,0,1-.49,0Zm-8.38-5.26H31.6a2.6,2.6,0,0,0,2.93-2.22,2.63,2.63,0,0,0,0-.56,2.69,2.69,0,0,0-2.6-2.78H27.48Z"
                  />
                  <path
                    id="Path_2110"
                    data-name="Path 2110"
                    class="cls-1"
                    d="M60.61,166.45a5.92,5.92,0,0,1-4.24,1.75,5.63,5.63,0,0,1-6-5.26q0-.31,0-.63a5.7,5.7,0,0,1,5.35-6h.63A6,6,0,0,1,60.61,158l-.61.53a5.15,5.15,0,1,0-3.63,8.81h0A5.21,5.21,0,0,0,60,165.89Z"
                  />
                  <path
                    id="Path_2111"
                    data-name="Path 2111"
                    class="cls-1"
                    d="M84.68,168.07v-5.3H77.26v5.3h-.9V156.42h.9V162h7.42v-5.54h.9v11.65Z"
                  />
                  <rect
                    id="Rectangle_1622"
                    data-name="Rectangle 1622"
                    class="cls-1"
                    x="101.8"
                    y="156.42"
                    width="0.88"
                    height="11.65"
                  />
                  <path
                    id="Path_2112"
                    data-name="Path 2112"
                    class="cls-1"
                    d="M128.55,156.42l-4.79,11.69h-1L118,156.42h1l4.31,10.65,4.3-10.65Z"
                  />
                  <path
                    id="Path_2113"
                    data-name="Path 2113"
                    class="cls-1"
                    d="M144.62,161.79h6.82v.82h-6.82v4.6H152v.86h-8.23V156.42h8v.85h-7.15Z"
                  />
                </g>
                <g id="logo">
                  <path
                    id="Path_2091"
                    data-name="Path 2091"
                    class="cls-2"
                    d="M38,24.34l39.08,9.41L38,73.89l7.28-30.08Z"
                  />
                  <path
                    id="Path_2092"
                    data-name="Path 2092"
                    class="cls-3"
                    d="M72.94,93.76,38,73.89l14.9-15.3Z"
                  />
                  <path
                    id="Path_2093"
                    data-name="Path 2093"
                    class="cls-4"
                    d="M45.25,43.82l31.8-10.07L38,24.34Z"
                  />
                  <path
                    id="Path_2094"
                    data-name="Path 2094"
                    class="cls-5"
                    d="M38,73.89,55.45,63.12l-2.59-4.53Z"
                  />
                  <path
                    id="Path_2095"
                    data-name="Path 2095"
                    class="cls-6"
                    d="M123.44,24.78,95.74,53.92,80.53,0l22.4,21.35Z"
                  />
                  <path
                    id="Path_2096"
                    data-name="Path 2096"
                    class="cls-7"
                    d="M45.84,20.34,80.53,0l5.81,20.56Z"
                  />
                  <path
                    id="Path_2097"
                    data-name="Path 2097"
                    class="cls-8"
                    d="M102.93,21.35,95.75,53.92l27.69-29.14Z"
                  />
                  <path
                    id="Path_2098"
                    data-name="Path 2098"
                    class="cls-9"
                    d="M80.53,0l.58,20.53,5.22,0Z"
                  />
                  <path
                    id="Path_2099"
                    data-name="Path 2099"
                    class="cls-10"
                    d="M80.41,98.6,69.74,59.84l54,14.79L93.93,82.8Z"
                  />
                  <path
                    id="Path_2100"
                    data-name="Path 2100"
                    class="cls-11"
                    d="M124.26,34.41l-.48,40.22L103.18,69Z"
                  />
                  <path
                    id="Path_2101"
                    data-name="Path 2101"
                    class="cls-12"
                    d="M93.93,82.8l-24.18-23L80.42,98.6Z"
                  />
                  <path
                    id="Path_2102"
                    data-name="Path 2102"
                    class="cls-13"
                    d="M123.78,74.63,105.9,64.53,103.18,69Z"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </router-link>
    </div>
    <div
      v-else
      class="
        logo-wrapper
        hidden
        md:block
        transition-all
        duration-500
        ease-in-out
      "
      :class="[
        showLogin || logoLeft || increaseIndex ? 'z-40' : 'z-20',
        showLogo ? 'fixed' : '',
      ]"
    >
      <router-link to="/" @click.native="closeStarterModal()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="
            sharpArchiveLogo
            logo-left
            absolute
            transition-all
            duration-1000
            cursor-pointer
          "
          :class="[
            increaseIndex || starterMaximized ? 'logo-left_fullExpand' : '',

            showLogin || logoLeft || increaseIndex ? 'z-40' : 'z-20',
          ]"
          width="66"
          height="70"
          viewBox="0 0 160 168.21"
        >
          <defs>
            <style>
              .cls-1 {
                fill: #8e8e8e;
              }
              .cls-2 {
                fill: #8db22f;
              }
              .cls-3 {
                fill: #6e9c2e;
              }
              .cls-4 {
                fill: #a0c749;
              }
              .cls-5 {
                fill: #60822d;
              }
              .cls-6 {
                fill: #7d80bd;
              }
              .cls-7 {
                fill: #5e60a9;
              }
              .cls-8 {
                fill: #a5a0cf;
              }
              .cls-9 {
                fill: #5957a2;
              }
              .cls-10 {
                fill: #e89921;
              }
              .cls-11 {
                fill: #e4801d;
              }
              .cls-12 {
                fill: #eba83b;
              }
              .cls-13 {
                fill: #b76d1c;
              }
            </style>
          </defs>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <g id="SharpArchiveLogo">
                <g id="name">
                  <path
                    id="Path_2103"
                    data-name="Path 2103"
                    class="cls-1"
                    d="M21.88,124.15c-1.12-1.86-4.18-3.62-7.7-3.62-4.53,0-6.71,1.9-6.71,4.32,0,2.83,3.32,3.62,7.23,4.08,6.76.84,13.06,2.6,13.06,10.34,0,7.23-6.4,10.34-13.63,10.34-6.62,0-11.72-2-14.13-8L5.1,139c1.44,3.57,5.19,5.15,9.12,5.15s7.46-1.33,7.46-4.87c0-3.06-3.2-4.32-7.5-4.77-6.62-.79-12.74-2.55-12.74-9.83C1.44,118,8,115.25,14,115.2c5,0,10.29,1.44,12.74,6.45Z"
                  />
                  <path
                    id="Path_2104"
                    data-name="Path 2104"
                    class="cls-1"
                    d="M54.58,148.81V135.69H38.64v13.12H32.53V116.36h6.11V130H54.58V116.36h6.07v32.45Z"
                  />
                  <path
                    id="Path_2105"
                    data-name="Path 2105"
                    class="cls-1"
                    d="M89.41,142.64h-17l-2.78,6.12H63.05l14.54-32.44h6.67l14.55,32.44H92.14Zm-8.48-19.51-6,13.81H87Z"
                  />
                  <path
                    id="Path_2106"
                    data-name="Path 2106"
                    class="cls-1"
                    d="M130.31,148.76H123l-9.47-10.85h-5.88v10.85h-6.11v-32.5c5.14,0,10.28,0,15.43,0,7.64,0,11.67,5.15,11.67,10.75,0,4.45-2,8.95-8.2,10.2l9.82,11.08ZM107.71,122V132.4H117c3.89,0,5.55-2.6,5.55-5.19S120.86,122,117,122Z"
                  />
                  <path
                    id="Path_2107"
                    data-name="Path 2107"
                    class="cls-1"
                    d="M148.09,139.21h-9.17v9.55h-6.11V116.31c5.1,0,10.19,0,15.29,0,15.84,0,15.89,23,0,23m-9.17-5.61h9.17c7.83,0,7.78-11.5,0-11.5h-9.17Z"
                  />
                  <path
                    id="Path_2108"
                    data-name="Path 2108"
                    class="cls-1"
                    d="M10.47,168.07l-1.28-2.86H2.24L1,168.07H0l5.22-11.64h1l5.23,11.64Zm-1.63-3.7-3.12-7.09-3.13,7.09Z"
                  />
                  <path
                    id="Path_2109"
                    data-name="Path 2109"
                    class="cls-1"
                    d="M35.86,168.07H34.68l-4-4.41H27.48v4.41h-.9V156.43H31.7a3.59,3.59,0,0,1,3.82,3.37,2.17,2.17,0,0,1,0,.26,3.43,3.43,0,0,1-3.29,3.58,4,4,0,0,1-.49,0Zm-8.38-5.26H31.6a2.6,2.6,0,0,0,2.93-2.22,2.63,2.63,0,0,0,0-.56,2.69,2.69,0,0,0-2.6-2.78H27.48Z"
                  />
                  <path
                    id="Path_2110"
                    data-name="Path 2110"
                    class="cls-1"
                    d="M60.61,166.45a5.92,5.92,0,0,1-4.24,1.75,5.63,5.63,0,0,1-6-5.26q0-.31,0-.63a5.7,5.7,0,0,1,5.35-6h.63A6,6,0,0,1,60.61,158l-.61.53a5.15,5.15,0,1,0-3.63,8.81h0A5.21,5.21,0,0,0,60,165.89Z"
                  />
                  <path
                    id="Path_2111"
                    data-name="Path 2111"
                    class="cls-1"
                    d="M84.68,168.07v-5.3H77.26v5.3h-.9V156.42h.9V162h7.42v-5.54h.9v11.65Z"
                  />
                  <rect
                    id="Rectangle_1622"
                    data-name="Rectangle 1622"
                    class="cls-1"
                    x="101.8"
                    y="156.42"
                    width="0.88"
                    height="11.65"
                  />
                  <path
                    id="Path_2112"
                    data-name="Path 2112"
                    class="cls-1"
                    d="M128.55,156.42l-4.79,11.69h-1L118,156.42h1l4.31,10.65,4.3-10.65Z"
                  />
                  <path
                    id="Path_2113"
                    data-name="Path 2113"
                    class="cls-1"
                    d="M144.62,161.79h6.82v.82h-6.82v4.6H152v.86h-8.23V156.42h8v.85h-7.15Z"
                  />
                </g>
                <g id="logo">
                  <path
                    id="Path_2091"
                    data-name="Path 2091"
                    class="cls-2"
                    d="M38,24.34l39.08,9.41L38,73.89l7.28-30.08Z"
                  />
                  <path
                    id="Path_2092"
                    data-name="Path 2092"
                    class="cls-3"
                    d="M72.94,93.76,38,73.89l14.9-15.3Z"
                  />
                  <path
                    id="Path_2093"
                    data-name="Path 2093"
                    class="cls-4"
                    d="M45.25,43.82l31.8-10.07L38,24.34Z"
                  />
                  <path
                    id="Path_2094"
                    data-name="Path 2094"
                    class="cls-5"
                    d="M38,73.89,55.45,63.12l-2.59-4.53Z"
                  />
                  <path
                    id="Path_2095"
                    data-name="Path 2095"
                    class="cls-6"
                    d="M123.44,24.78,95.74,53.92,80.53,0l22.4,21.35Z"
                  />
                  <path
                    id="Path_2096"
                    data-name="Path 2096"
                    class="cls-7"
                    d="M45.84,20.34,80.53,0l5.81,20.56Z"
                  />
                  <path
                    id="Path_2097"
                    data-name="Path 2097"
                    class="cls-8"
                    d="M102.93,21.35,95.75,53.92l27.69-29.14Z"
                  />
                  <path
                    id="Path_2098"
                    data-name="Path 2098"
                    class="cls-9"
                    d="M80.53,0l.58,20.53,5.22,0Z"
                  />
                  <path
                    id="Path_2099"
                    data-name="Path 2099"
                    class="cls-10"
                    d="M80.41,98.6,69.74,59.84l54,14.79L93.93,82.8Z"
                  />
                  <path
                    id="Path_2100"
                    data-name="Path 2100"
                    class="cls-11"
                    d="M124.26,34.41l-.48,40.22L103.18,69Z"
                  />
                  <path
                    id="Path_2101"
                    data-name="Path 2101"
                    class="cls-12"
                    d="M93.93,82.8l-24.18-23L80.42,98.6Z"
                  />
                  <path
                    id="Path_2102"
                    data-name="Path 2102"
                    class="cls-13"
                    d="M123.78,74.63,105.9,64.53,103.18,69Z"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </router-link>
    </div>
    <div
      v-if="$route.name === 'index'"
      class="logo-wrapper md:hidden transition-all duration-500 ease-in-out"
      :class="[
        showLogin || logoLeft || increaseIndex ? 'z-40' : 'z-20',
        showLogo ? 'fixed' : '',
      ]"
    >
      <router-link to="/" @click.native="closeStarterModal()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="
            sharpArchiveLogo
            fixed
            transition-all
            duration-1000
            cursor-pointer
          "
          :class="[
            isSticky ||
            headerWidth ||
            logoLeft ||
            increaseIndex ||
            starterMaximized
              ? 'logo-left'
              : 'logo-center',

            showLogin || logoLeft || increaseIndex ? 'z-40' : 'z-20',
          ]"
          width="140"
          height="140"
          viewBox="0 0 160 168.21"
        >
          <defs>
            <style>
              .cls-1 {
                fill: #8e8e8e;
              }
              .cls-2 {
                fill: #8db22f;
              }
              .cls-3 {
                fill: #6e9c2e;
              }
              .cls-4 {
                fill: #a0c749;
              }
              .cls-5 {
                fill: #60822d;
              }
              .cls-6 {
                fill: #7d80bd;
              }
              .cls-7 {
                fill: #5e60a9;
              }
              .cls-8 {
                fill: #a5a0cf;
              }
              .cls-9 {
                fill: #5957a2;
              }
              .cls-10 {
                fill: #e89921;
              }
              .cls-11 {
                fill: #e4801d;
              }
              .cls-12 {
                fill: #eba83b;
              }
              .cls-13 {
                fill: #b76d1c;
              }
            </style>
          </defs>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <g id="SharpArchiveLogo">
                <g id="name">
                  <path
                    id="Path_2103"
                    data-name="Path 2103"
                    class="cls-1"
                    d="M21.88,124.15c-1.12-1.86-4.18-3.62-7.7-3.62-4.53,0-6.71,1.9-6.71,4.32,0,2.83,3.32,3.62,7.23,4.08,6.76.84,13.06,2.6,13.06,10.34,0,7.23-6.4,10.34-13.63,10.34-6.62,0-11.72-2-14.13-8L5.1,139c1.44,3.57,5.19,5.15,9.12,5.15s7.46-1.33,7.46-4.87c0-3.06-3.2-4.32-7.5-4.77-6.62-.79-12.74-2.55-12.74-9.83C1.44,118,8,115.25,14,115.2c5,0,10.29,1.44,12.74,6.45Z"
                  />
                  <path
                    id="Path_2104"
                    data-name="Path 2104"
                    class="cls-1"
                    d="M54.58,148.81V135.69H38.64v13.12H32.53V116.36h6.11V130H54.58V116.36h6.07v32.45Z"
                  />
                  <path
                    id="Path_2105"
                    data-name="Path 2105"
                    class="cls-1"
                    d="M89.41,142.64h-17l-2.78,6.12H63.05l14.54-32.44h6.67l14.55,32.44H92.14Zm-8.48-19.51-6,13.81H87Z"
                  />
                  <path
                    id="Path_2106"
                    data-name="Path 2106"
                    class="cls-1"
                    d="M130.31,148.76H123l-9.47-10.85h-5.88v10.85h-6.11v-32.5c5.14,0,10.28,0,15.43,0,7.64,0,11.67,5.15,11.67,10.75,0,4.45-2,8.95-8.2,10.2l9.82,11.08ZM107.71,122V132.4H117c3.89,0,5.55-2.6,5.55-5.19S120.86,122,117,122Z"
                  />
                  <path
                    id="Path_2107"
                    data-name="Path 2107"
                    class="cls-1"
                    d="M148.09,139.21h-9.17v9.55h-6.11V116.31c5.1,0,10.19,0,15.29,0,15.84,0,15.89,23,0,23m-9.17-5.61h9.17c7.83,0,7.78-11.5,0-11.5h-9.17Z"
                  />
                  <path
                    id="Path_2108"
                    data-name="Path 2108"
                    class="cls-1"
                    d="M10.47,168.07l-1.28-2.86H2.24L1,168.07H0l5.22-11.64h1l5.23,11.64Zm-1.63-3.7-3.12-7.09-3.13,7.09Z"
                  />
                  <path
                    id="Path_2109"
                    data-name="Path 2109"
                    class="cls-1"
                    d="M35.86,168.07H34.68l-4-4.41H27.48v4.41h-.9V156.43H31.7a3.59,3.59,0,0,1,3.82,3.37,2.17,2.17,0,0,1,0,.26,3.43,3.43,0,0,1-3.29,3.58,4,4,0,0,1-.49,0Zm-8.38-5.26H31.6a2.6,2.6,0,0,0,2.93-2.22,2.63,2.63,0,0,0,0-.56,2.69,2.69,0,0,0-2.6-2.78H27.48Z"
                  />
                  <path
                    id="Path_2110"
                    data-name="Path 2110"
                    class="cls-1"
                    d="M60.61,166.45a5.92,5.92,0,0,1-4.24,1.75,5.63,5.63,0,0,1-6-5.26q0-.31,0-.63a5.7,5.7,0,0,1,5.35-6h.63A6,6,0,0,1,60.61,158l-.61.53a5.15,5.15,0,1,0-3.63,8.81h0A5.21,5.21,0,0,0,60,165.89Z"
                  />
                  <path
                    id="Path_2111"
                    data-name="Path 2111"
                    class="cls-1"
                    d="M84.68,168.07v-5.3H77.26v5.3h-.9V156.42h.9V162h7.42v-5.54h.9v11.65Z"
                  />
                  <rect
                    id="Rectangle_1622"
                    data-name="Rectangle 1622"
                    class="cls-1"
                    x="101.8"
                    y="156.42"
                    width="0.88"
                    height="11.65"
                  />
                  <path
                    id="Path_2112"
                    data-name="Path 2112"
                    class="cls-1"
                    d="M128.55,156.42l-4.79,11.69h-1L118,156.42h1l4.31,10.65,4.3-10.65Z"
                  />
                  <path
                    id="Path_2113"
                    data-name="Path 2113"
                    class="cls-1"
                    d="M144.62,161.79h6.82v.82h-6.82v4.6H152v.86h-8.23V156.42h8v.85h-7.15Z"
                  />
                </g>
                <g id="logo">
                  <path
                    id="Path_2091"
                    data-name="Path 2091"
                    class="cls-2"
                    d="M38,24.34l39.08,9.41L38,73.89l7.28-30.08Z"
                  />
                  <path
                    id="Path_2092"
                    data-name="Path 2092"
                    class="cls-3"
                    d="M72.94,93.76,38,73.89l14.9-15.3Z"
                  />
                  <path
                    id="Path_2093"
                    data-name="Path 2093"
                    class="cls-4"
                    d="M45.25,43.82l31.8-10.07L38,24.34Z"
                  />
                  <path
                    id="Path_2094"
                    data-name="Path 2094"
                    class="cls-5"
                    d="M38,73.89,55.45,63.12l-2.59-4.53Z"
                  />
                  <path
                    id="Path_2095"
                    data-name="Path 2095"
                    class="cls-6"
                    d="M123.44,24.78,95.74,53.92,80.53,0l22.4,21.35Z"
                  />
                  <path
                    id="Path_2096"
                    data-name="Path 2096"
                    class="cls-7"
                    d="M45.84,20.34,80.53,0l5.81,20.56Z"
                  />
                  <path
                    id="Path_2097"
                    data-name="Path 2097"
                    class="cls-8"
                    d="M102.93,21.35,95.75,53.92l27.69-29.14Z"
                  />
                  <path
                    id="Path_2098"
                    data-name="Path 2098"
                    class="cls-9"
                    d="M80.53,0l.58,20.53,5.22,0Z"
                  />
                  <path
                    id="Path_2099"
                    data-name="Path 2099"
                    class="cls-10"
                    d="M80.41,98.6,69.74,59.84l54,14.79L93.93,82.8Z"
                  />
                  <path
                    id="Path_2100"
                    data-name="Path 2100"
                    class="cls-11"
                    d="M124.26,34.41l-.48,40.22L103.18,69Z"
                  />
                  <path
                    id="Path_2101"
                    data-name="Path 2101"
                    class="cls-12"
                    d="M93.93,82.8l-24.18-23L80.42,98.6Z"
                  />
                  <path
                    id="Path_2102"
                    data-name="Path 2102"
                    class="cls-13"
                    d="M123.78,74.63,105.9,64.53,103.18,69Z"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </router-link>
    </div>
    <div
      v-else
      class="logo-wrapper md:hidden transition-all duration-500 ease-in-out"
      :class="[
        showLogin || logoLeft || increaseIndex ? 'z-40' : 'z-20',
        showLogo ? 'fixed' : '',
      ]"
    >
      <router-link to="/" @click.native="closeStarterModal()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="
            sharpArchiveLogo
            logo-left
            fixed
            transition-all
            duration-1000
            cursor-pointer
          "
          :class="[showLogin || logoLeft || increaseIndex ? 'z-40' : 'z-20']"
          width="100"
          height="80"
          viewBox="0 0 160 168.21"
          :style="{ '--marginLeft': `${windowWidth - 50}px` }"
        >
          <defs>
            <style>
              .cls-1 {
                fill: #8e8e8e;
              }
              .cls-2 {
                fill: #8db22f;
              }
              .cls-3 {
                fill: #6e9c2e;
              }
              .cls-4 {
                fill: #a0c749;
              }
              .cls-5 {
                fill: #60822d;
              }
              .cls-6 {
                fill: #7d80bd;
              }
              .cls-7 {
                fill: #5e60a9;
              }
              .cls-8 {
                fill: #a5a0cf;
              }
              .cls-9 {
                fill: #5957a2;
              }
              .cls-10 {
                fill: #e89921;
              }
              .cls-11 {
                fill: #e4801d;
              }
              .cls-12 {
                fill: #eba83b;
              }
              .cls-13 {
                fill: #b76d1c;
              }
            </style>
          </defs>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <g id="SharpArchiveLogo">
                <g id="name">
                  <path
                    id="Path_2103"
                    data-name="Path 2103"
                    class="cls-1"
                    d="M21.88,124.15c-1.12-1.86-4.18-3.62-7.7-3.62-4.53,0-6.71,1.9-6.71,4.32,0,2.83,3.32,3.62,7.23,4.08,6.76.84,13.06,2.6,13.06,10.34,0,7.23-6.4,10.34-13.63,10.34-6.62,0-11.72-2-14.13-8L5.1,139c1.44,3.57,5.19,5.15,9.12,5.15s7.46-1.33,7.46-4.87c0-3.06-3.2-4.32-7.5-4.77-6.62-.79-12.74-2.55-12.74-9.83C1.44,118,8,115.25,14,115.2c5,0,10.29,1.44,12.74,6.45Z"
                  />
                  <path
                    id="Path_2104"
                    data-name="Path 2104"
                    class="cls-1"
                    d="M54.58,148.81V135.69H38.64v13.12H32.53V116.36h6.11V130H54.58V116.36h6.07v32.45Z"
                  />
                  <path
                    id="Path_2105"
                    data-name="Path 2105"
                    class="cls-1"
                    d="M89.41,142.64h-17l-2.78,6.12H63.05l14.54-32.44h6.67l14.55,32.44H92.14Zm-8.48-19.51-6,13.81H87Z"
                  />
                  <path
                    id="Path_2106"
                    data-name="Path 2106"
                    class="cls-1"
                    d="M130.31,148.76H123l-9.47-10.85h-5.88v10.85h-6.11v-32.5c5.14,0,10.28,0,15.43,0,7.64,0,11.67,5.15,11.67,10.75,0,4.45-2,8.95-8.2,10.2l9.82,11.08ZM107.71,122V132.4H117c3.89,0,5.55-2.6,5.55-5.19S120.86,122,117,122Z"
                  />
                  <path
                    id="Path_2107"
                    data-name="Path 2107"
                    class="cls-1"
                    d="M148.09,139.21h-9.17v9.55h-6.11V116.31c5.1,0,10.19,0,15.29,0,15.84,0,15.89,23,0,23m-9.17-5.61h9.17c7.83,0,7.78-11.5,0-11.5h-9.17Z"
                  />
                  <path
                    id="Path_2108"
                    data-name="Path 2108"
                    class="cls-1"
                    d="M10.47,168.07l-1.28-2.86H2.24L1,168.07H0l5.22-11.64h1l5.23,11.64Zm-1.63-3.7-3.12-7.09-3.13,7.09Z"
                  />
                  <path
                    id="Path_2109"
                    data-name="Path 2109"
                    class="cls-1"
                    d="M35.86,168.07H34.68l-4-4.41H27.48v4.41h-.9V156.43H31.7a3.59,3.59,0,0,1,3.82,3.37,2.17,2.17,0,0,1,0,.26,3.43,3.43,0,0,1-3.29,3.58,4,4,0,0,1-.49,0Zm-8.38-5.26H31.6a2.6,2.6,0,0,0,2.93-2.22,2.63,2.63,0,0,0,0-.56,2.69,2.69,0,0,0-2.6-2.78H27.48Z"
                  />
                  <path
                    id="Path_2110"
                    data-name="Path 2110"
                    class="cls-1"
                    d="M60.61,166.45a5.92,5.92,0,0,1-4.24,1.75,5.63,5.63,0,0,1-6-5.26q0-.31,0-.63a5.7,5.7,0,0,1,5.35-6h.63A6,6,0,0,1,60.61,158l-.61.53a5.15,5.15,0,1,0-3.63,8.81h0A5.21,5.21,0,0,0,60,165.89Z"
                  />
                  <path
                    id="Path_2111"
                    data-name="Path 2111"
                    class="cls-1"
                    d="M84.68,168.07v-5.3H77.26v5.3h-.9V156.42h.9V162h7.42v-5.54h.9v11.65Z"
                  />
                  <rect
                    id="Rectangle_1622"
                    data-name="Rectangle 1622"
                    class="cls-1"
                    x="101.8"
                    y="156.42"
                    width="0.88"
                    height="11.65"
                  />
                  <path
                    id="Path_2112"
                    data-name="Path 2112"
                    class="cls-1"
                    d="M128.55,156.42l-4.79,11.69h-1L118,156.42h1l4.31,10.65,4.3-10.65Z"
                  />
                  <path
                    id="Path_2113"
                    data-name="Path 2113"
                    class="cls-1"
                    d="M144.62,161.79h6.82v.82h-6.82v4.6H152v.86h-8.23V156.42h8v.85h-7.15Z"
                  />
                </g>
                <g id="logo">
                  <path
                    id="Path_2091"
                    data-name="Path 2091"
                    class="cls-2"
                    d="M38,24.34l39.08,9.41L38,73.89l7.28-30.08Z"
                  />
                  <path
                    id="Path_2092"
                    data-name="Path 2092"
                    class="cls-3"
                    d="M72.94,93.76,38,73.89l14.9-15.3Z"
                  />
                  <path
                    id="Path_2093"
                    data-name="Path 2093"
                    class="cls-4"
                    d="M45.25,43.82l31.8-10.07L38,24.34Z"
                  />
                  <path
                    id="Path_2094"
                    data-name="Path 2094"
                    class="cls-5"
                    d="M38,73.89,55.45,63.12l-2.59-4.53Z"
                  />
                  <path
                    id="Path_2095"
                    data-name="Path 2095"
                    class="cls-6"
                    d="M123.44,24.78,95.74,53.92,80.53,0l22.4,21.35Z"
                  />
                  <path
                    id="Path_2096"
                    data-name="Path 2096"
                    class="cls-7"
                    d="M45.84,20.34,80.53,0l5.81,20.56Z"
                  />
                  <path
                    id="Path_2097"
                    data-name="Path 2097"
                    class="cls-8"
                    d="M102.93,21.35,95.75,53.92l27.69-29.14Z"
                  />
                  <path
                    id="Path_2098"
                    data-name="Path 2098"
                    class="cls-9"
                    d="M80.53,0l.58,20.53,5.22,0Z"
                  />
                  <path
                    id="Path_2099"
                    data-name="Path 2099"
                    class="cls-10"
                    d="M80.41,98.6,69.74,59.84l54,14.79L93.93,82.8Z"
                  />
                  <path
                    id="Path_2100"
                    data-name="Path 2100"
                    class="cls-11"
                    d="M124.26,34.41l-.48,40.22L103.18,69Z"
                  />
                  <path
                    id="Path_2101"
                    data-name="Path 2101"
                    class="cls-12"
                    d="M93.93,82.8l-24.18-23L80.42,98.6Z"
                  />
                  <path
                    id="Path_2102"
                    data-name="Path 2102"
                    class="cls-13"
                    d="M123.78,74.63,105.9,64.53,103.18,69Z"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </router-link>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    logoHide: {
      type: Boolean,
    },
    showLogin: {
      type: Boolean,
    },
  },
  computed: {
    ...mapState({
      starterExpanded: 'starterExpanded',
      starterMaximized: 'starterMaximized',
      starterAccountMaximized: 'starterAccountMaximized',
      isSticky: 'isSticky',
      headerWidth: 'headerWidth',
      setupContent: 'setupContent',
    }),
  },
  data() {
    return {
      logoPosition: false,
      showLogo: false,
      logoLeft: false,
      increaseIndex: false,
      windowWidth: 0,
      logoWidth: 0,
      logoCenter: true,
      logo: false,
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === 'index') {
        this.setIsSticky(false)
        this.showLogo = false
      } else if (
        to.name === 'industries' ||
        to.name === 'contact' ||
        to.name === 'about' ||
        to.name === 'faq'
      ) {
        this.showLogo = true
      }
    },
    starterMaximized(data) {
      if (data) {
        this.logoLeft = true
      } else {
        setTimeout(() => {
          this.logoLeft = false
        }, 500)
      }
    },
    starterAccountMaximized(data) {
      if (data) {
        this.increaseIndex = true
      } else {
        setTimeout(() => {
          this.increaseIndex = false
        }, 700)
      }
    },
  },
  mounted() {
    if (
      this.$route.name === 'industries' ||
      this.$route.name === 'contact' ||
      this.$route.name === 'about'
    ) {
      this.showLogo = true
    }

    this.windowWidth = window.innerWidth / 2
    // this.logoWidth = document.getElementById('landing-logo').clientWidth / 2
    if (this.windowWidth > 0) {
      setTimeout(() => {
        this.logo = true
      }, 830)
    }
    this.logoCenter = false
  },
  methods: {
    ...mapActions({
      setStorageFormatSelect: 'setStorageFormatSelect',
      setIsSticky: 'set_sticky',
      setHeaderWidth: 'set_header_width',
    }),
    ...mapActions('feeds', ['disableSecurityPaymentTab']),

    closeStarterModal() {
      this.setStorageFormatSelect(false)
      this.disableSecurityPaymentTab()
      if (this.setupContent === 'price-plan') {
        this.updateSetupContent('starter-button')
      }
      setTimeout(() => {
        if (!this.starterMaximized && this.starterExpanded) {
          this.expand_starter_modal(false)
        } else if (this.starterMaximized) {
          this.maximize_starter_modal(false)
        }
      }, 100)
      if (this.starterAccountMaximized) {
        this.starter_account_maximized(false)
        this.collapse_starter_modal(false)
      }
      if (this.starterExpanded && !this.starterMaximized) {
        this.collapse_starter_modal(true)
        this.show_sign_up(false)
      }
      if (!this.starterMaximized && !this.starterAccountMaximized) {
        setTimeout(() => {
          this.updateSetupContent('starter-button')
        }, 2000)
      } else {
        setTimeout(() => {
          this.updateSetupContent('price-plan')
        }, 1500)
      }
    },
    ...mapActions({
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      show_sign_up: 'show_sign_up',
      maximize_starter_modal: 'maximize_starter_modal',
      starter_account_maximized: 'starter_account_maximized',
      updateSetupContent: 'updateSetupContent',
    }),
  },
}
</script>
<style lang="scss" scoped>
.sharpArchiveLogo {
  $margin-left: var(--marginLeft);
  position: fixed;
  -webkit-animation: 1s appear;
  -moz-animation: 1s appear; /* Firefox */
  -ms-animation: 1s appear; /* Internet Explorer */
  -o-animation: 1s appear;
  // margin: auto;
  z-index: 0;
  // margin-left: 0px;

  @keyframes appear {
    0% {
      opacity: 0;
    }
  }

  &.logo-center {
    @apply md:top-28 top-13 md:w-40 md:h-40 w-26;
    // transform: translate(-50%, 0%);
    // -webkit-transform: translate(-50%, 0); /* Safari & Chrome */
    // -moz-transform: translate(-50%, 0); /* Firefox */
    // -ms-transform: translate(-50%, 0); /* Internet Explorer */
    // -o-transform: translate(-50%, 0);
    // left: $margin-left;
    left: calc(50vw - 80px);
  }

  &.logo-center1 {
    @apply md:top-28 top-13 left-1/2 md:w-40 md:h-40 w-26;
    transform: translate(-50%, 0%);
    -webkit-transform: translate(-50%, 0); /* Safari & Chrome */
    -moz-transform: translate(-50%, 0); /* Firefox */
    -ms-transform: translate(-50%, 0); /* Internet Explorer */
    -o-transform: translate(-50%, 0);
  }

  &.logo-left {
    top: 0.9rem;
    height: 70px;
    width: 66px;
    // left: 30px;
    // transform: translate(-10%, 0%);
    // -webkit-transform: translate(-10%, 0); /* Safari & Chrome */
    // -moz-transform: translate(-10%, 0); /* Firefox */
    // -ms-transform: translate(-10%, 0); /* Internet Explorer */
    // -o-transform: translate(-10%, 0);
    @apply xl:left-17 md:left-8;
  }

  &.logo-left_fullExpand {
    top: 3.1rem;
    height: 80px;
    width: 6.25rem;
    left: 0%;
    margin-left: 49.6px;
  }
}

@media (max-width: 1359px) and (min-width: 1279px) {
  .logo-left {
    left: 2rem !important;
  }
}

@media (max-width: 767px) {
  .logo-left {
    top: 0.6rem;
    height: 80px;
    width: 6.25rem;
    @apply left-4;
    // left: 30px;
  }
  .logo-center {
    left: calc(50vw - 50px) !important;
  }
  .logo-center1 {
    @apply md:top-28 top-13 left-1/2 md:w-40 md:h-40 w-26;
    transform: translate(-50%, 0%);
    -webkit-transform: translate(-50%, 0); /* Safari & Chrome */
    -moz-transform: translate(-50%, 0); /* Firefox */
    -ms-transform: translate(-50%, 0); /* Internet Explorer */
    -o-transform: translate(-50%, 0);
  }
}

.cls-1 {
  fill: #8e8e8e;
}
</style>
