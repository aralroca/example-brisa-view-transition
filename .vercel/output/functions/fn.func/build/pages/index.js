function e(r,{children:t,...c},m){let s=t;if(Array.isArray(t)&&!t?.[o])s=t.map((n)=>n?.[o]?n:a({children:n}));return Object.assign([r,{...c,key:m},s],{[o]:!0})}var o=Symbol.for("isJSX"),a=(r)=>e(null,r);a.__isFragment=!0;function i({pokemon:r}){return e("a",{href:`/pokemon/${r.slug}`,renderMode:"transition",class:"block",children:e("article",{class:"group bg-flex flex-col sm:w-64 w-1/4 bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-xl hover:shadow-gray-100 transition-all",children:[e("div",{class:"sm:w-64 w-1/4 overflow-hidden",children:e("img",{src:r.cover,alt:r.name,style:{"view-transition-name":`${r.slug}-image`},class:"object-cover object-center w-full grayscale-[0.1] group-hover:grayscale-0 h-full rounded-md group-hover:scale-105 transition-all"})}),e("div",{class:"p-6",children:[e("h3",{class:"font-semibold truncate",style:{"view-transition-name":`${r.slug}-title`},children:r.name}),e("p",{class:"text-gray-600 text-sm truncate",style:{"view-transition-name":`${r.slug}-description`},children:r.description})]})]})})}var l=[{id:32,name:"Charmander",slug:"charmander",description:"Charmander is a Fire-type Pok\xE9mon. It evolves into Charmeleon starting at level 16. It is one of the three Starter Pok\xE9mon introduced in the Kanto region.",cover:"/pokemons/charmander.jpg",attacks:[{name:"Ember",power:40},{name:"Scratch",power:40}],category:"fire"},{id:18,name:"Pikachu",slug:"pikachu",description:"Pikachu is an Electric-type Pok\xE9mon. It evolves from Pichu when leveled up with high friendship and evolves into Raichu when exposed to a Thunder Stone.",cover:"/pokemons/pika.jpeg",category:"electric",attacks:[{name:"Thunder Shock",power:40},{name:"Quick Attack",power:40}]},{id:21,name:"Bulbasaur",slug:"bulbasaur",description:"Bulbasaur is a Grass/Poison-type Pok\xE9mon. It evolves into Ivysaur starting at level 16. It is one of the three Starter Pok\xE9mon introduced in the Kanto region.",cover:"/pokemons/bulbasaur.jpg",category:"grass",attacks:[{name:"Tackle",power:40},{name:"Vine Whip",power:40}]},{id:49,name:"Squirtle",slug:"squirtle",description:"Squirtle is a Water-type Pok\xE9mon. It evolves into Wartortle starting at level 16. It is one of the three Starter Pok\xE9mon introduced in the Kanto region.",cover:"/pokemons/squirtle.jpeg",category:"water",attacks:[{name:"Tackle",power:40},{name:"Water Gun",power:40}]}];function d(){return e(a,{children:[e("div",{children:[e("h1",{class:"text-5xl font-bold mb-4",children:"Brisa - Poke"}),e("h3",{class:"text-xl text-gray-500 mb-8",children:"An example using View Transitions with Brisa."})]}),e("div",{class:"flex flex-wrap gap-4 py-8",children:l.map((r)=>e(i,{pokemon:r}))})]})}export{d as default};
