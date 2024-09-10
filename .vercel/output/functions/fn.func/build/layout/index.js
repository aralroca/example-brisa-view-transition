function l(r){return Object.assign(["HTML",{html:r},null],{[Symbol.for("isJSX")]:!0})}function d(r,{children:n,...i},a){let o=n;if(Array.isArray(n)&&!n?.[s])o=n.map((t)=>t?.[s]?t:f({children:t}));return Object.assign([r,{...i,key:a},o],{[s]:!0})}var s=Symbol.for("isJSX"),f=(r)=>d(null,r);f.__isFragment=!0;function e(r,{children:n,...i},a){let o=n;if(Array.isArray(n)&&!n?.[c])o=n.map((t)=>t?.[c]?t:u({children:t}));return Object.assign([r,{...i,key:a},o],{[c]:!0})}var c=Symbol.for("isJSX"),u=(r)=>e(null,r);u.__isFragment=!0;function g({children:r}){return e("html",{lang:"en",children:[e("head",{children:[e("meta",{charSet:"UTF-8"}),e("meta",{name:"twitter:card",content:"summary_large_image"}),e("meta",{name:"viewport",content:"width=device-width"}),e("link",{rel:"icon",type:"image/svg+xml",href:"/favicon.svg"}),e("script",{src:"https://cdn.tailwindcss.com"}),e("title",{children:"Brisa - View Transitions"})]}),e("body",{class:"bg-gradient-to-tl via-transparent from-gray-500/5",children:[e("main",{class:"relative max-w-6xl min-h-screen mx-auto py-6 lg:pt-10 px-4 pb-20",children:r}),e("style",{children:l(`
      :root {
      }
      body {
        background-color: theme(colors.gray.50);
      }
      .animate-in {
        animation: animate-in 0.5s ease-in-out;
      }
      /* Firefox */
      * {
        scrollbar-width: auto;
        scrollbar-color: #c7c7c7 #ededed;
      }

      /* Chrome, Edge, and Safari */
      *::-webkit-scrollbar {
        width: 15px;
      }

      *::-webkit-scrollbar-track {
        background: #ededed;
      }

      *::-webkit-scrollbar-thumb {
        background-color: #c7c7c7;
        border-radius: 5px;
        border: 2px solid #ffffff;
      }
      @keyframes animate-in {
        0% {
          opacity: 0;
          transform: translateY(1rem);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      `)})]})]})}export{g as default};
