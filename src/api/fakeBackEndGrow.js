// Body Parts

var pet = 
[
    {
        name: 'no pet'
    },  
    {
        name: 'armadillo-base',
        source: 'static/raw_sprites/spritesmith/stable/pets/Pet-Armadillo-Base.png',
        size: '0.5',
    },   
],

    body = {
      'hair': [
        {
        name: 'no hair',
        },
        {
        name: 'ghostwhite hair',
        source: '@/../static/raw_sprites/spritesmith/customize/hair/hair_bangs_1_ghostwhite.png',
        layer: '4',
        },
      ],
      'beard': [
        {
        name: 'no beard',
        },
        {
        name: 'black beard',
        source: '@/../static/raw_sprites/spritesmith/customize/beards/hair_beard_2_black.png',
        layer: '3',
        },
      ],
      'shirt': [
        {
        name: 'no shirt',
        },
        {
        name: 'broad black shirt',
        source: '@/../static/raw_sprites/spritesmith/customize/shirts/broad_shirt_black.png',
        layer: '2',
        },
      ],
      'skin': [
        {
        name: 'no skin',
        },
        {
        name: 'dark skin',
        source: '@/../static/raw_sprites/spritesmith/customize/skin/skin_98461a.png',
        layer: '1',
        },
      ],

  },

// ITEMS
  items = {
      'helmet': [
        {
        name: 'no helmet',
        },
        {
        name: 'samurai helmet',
        source: '@/../static/raw_sprites/spritesmith/gear/head/head_special_kabuto.png',
        layer: '7',
        },
      ],
      'armor': [
        {
        name: 'no armor',
        },
        {
        name: 'falconer armor',
        source: '@/../static/raw_sprites/spritesmith/gear/armoire/broad_armor_armoire_falconerArmor.png',
        layer: '6',
        },
      ],
      'weapon': [
        {
        name: 'no weapon',
        },
        {
        name: 'lantern',
        source: '@/../static/raw_sprites/spritesmith/gear/weapon/weapon_special_taskwoodsLantern.png',
        layer: '8',
        },
      ],

  },



  avatar = 
  {
    body: [1,0,1,1],  // 1 "hair", 2 "beard", 3 "shirt", 4 "skin",
    equipped: [0,1,1,0,0],         // 1  "helmet", 2 "armor", 3 "weapon", 4 "shield", 5 "shoes"
  };


//cb(avatar, body, ...) --> specify in avatar.js as well

export default {
    fetchState(cb){
        cb({
          avatar: avatar,
          body: body,
          items: items,
        });

    },

    fetchPet(cb){
        cb({
            pet: pet,
        });
    },

}
















// PET VARIABLES

/* 
{
    number: 0,
    name: "chainsaw",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/a_29/v1497786925/chainsaw_klqmdz.png",
    category: "weapon",
    coordinates: [100, 98],
    descriptionShop: "RHMMMM RHMMMM!",
    descriptionSideBar: "It's so shiny!",
    size: [55, 50],
    gold: 50,
  },
  {
    number: 1,
    name: "fancy party robes",
    layer: 1,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497446465/partyRobes_ej2rzu_tg5bps.png",
    category: "armor",
    descriptionShop: "Fancy Schmancy and a little bit of garlic",
    descriptionSideBar: "Is it going to fit?!",
    coordinates: [132, 125],
    size: [60, 32],
    gold: 10,
  },
  {
    number: 2,
    name: "weird costume",
    layer: 1,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497446755/weirdRobes_vgy0ru_quwuye.png",
    category: "armor",
    descriptionShop: "You will never get dirty with these ones!",
    coordinates: [126, 123], // y , x for whatever reasons, le me!
    size: [60, 36],
    gold: 15
  },
  {
    number: 3,
    name: "basic sword",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211196/55_9_f43pm3.png",
    category: "weapon",
    coordinates: [112, 117],
    size: [35, 35],
  },
  {
    number: 4,
    name: "fancy sword",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211188/55_10_uuuedo.png",
    category: "weapon",
    coordinates: [109, 115],
    size: [35, 35],
  },
  {
    number: 5,
    name: "rusty hat",
    layer: 2,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497210647/55_22_apqpad.png",
    category: "helmet",
    coordinates: [80, 123],
    size: [64, 44],
  },
  {
    number: 6,
    name: "viking hat",
    layer: 6,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211123/55_23_hcoanh.png",
    category: "helmet",
    coordinates: [40, 37],
    size: [65, 45],
  },
  {
    number: 7,
    name: "Axe",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211178/55_11_jgeinf.png",
    category: "weapon",
    coordinates:  [92, 102],
    size: [50, 50],
    
  },
  {
    number: 8,
    name: "warrior armor",
    layer: 2,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211148/55_18_j0wdw1.png",
    category: "armor",
    coordinates: [128, 125],
    size: [60, 37],
  },
  {
    number: 9,
    name: "Welcome to the Club",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211169/55_12_hlq2hd.png",
    category: "weapon",
    descriptionShop: "Who does not like <br> a little bit of clubbing <br> once in a while?",
    coordinates: [92, 103],
    size: [50, 50],
  },
  {
    number: 10,
    name: "fiery sword",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211160/55_14_brpmlx.png",
    category: "weapon",
    descriptionShop: "A burning piece of steel",
    coordinates: [105, 112] ,
    size: [40, 40], 
  },
  {
    number: 11,
    name: "golden shield",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497212849/latest_19_gnx49k.png",
    category: "shield",
    coordinates: [125, 150],
    size: [40, 40], 
  },
  {
    number: 12,
    name: "apprentice robe",
    layer: 1,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1498582495/apprentice_robe_xzmad0.png",
    category: "armor",
    coordinates: [116, 130],
    size: [50, 60],
    gold: 25,
  },
  {
    number: 13,
    name: "apprentice hat",
    layer: 2,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1498582495/apprentice_hat_azxwzy.png",
    category: "helmet",
    coordinates: [78, 123],
    size: [65, 45],
    gold: 20,
  },
  {
    number: 14,
    name: "apprentice staff",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1498582495/apprentice_staff_j6u0ot.png",
    category: "weapon",
    coordinates: [105, 96],
    size: [65,56],
    gold: 15,
  },
  {
    number: 15,
    name: "hitchhikers suits",
    layer: 1,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1499957110/pageArmor_xt3cww.png",
    category: "armor",
    coordinates: [108, 125],
    size: [60, 65],
    gold: 25,
  },
],




var body = [
  {
    number: 0,
    name: "no bodyPart",
    layer: 1,
    source: "../../../../static/raw_sprites/spritesmith/customize/skin/skin_ea8349.png",
    coordinates: [19,32],
    category: "beard",
    size: [85,85],
  },
  {
    number: 1,
    name: "white hair bangs",
    layer: 3,
    source: "../../../../static/raw_sprites/spritesmith/customize/hair/hair_bangs_1_ghostwhite.png",
    category: "hair",
    coordinates: [17,30],
    size: [88,88],
  },
  {
    number: 2,
    name: "dark skin",
    layer: 1,
    source: "../../../../static/raw_sprites/spritesmith/customize/skin/skin_98461a.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },
  {
    number: 3,
    name: "midnight hair bangs",
    layer: 3,
    source: "../../../../static/raw_sprites/spritesmith/customize/hair/hair_bangs_1_midnight.png",
    category: "hair",
    coordinates: [17,30],
    size: [88,88],
  },
  {
    number: 4,
    name: "aurora skin",
    layer: 1,
    source: "../../../../static/raw_sprites/spritesmith/customize/skin/skin_aurora.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 5,
    name: "halloween hair bangs",
    layer: 3,
    source: "../../../../static/raw_sprites/spritesmith/customize/hair/hair_bangs_1_halloween.png",
    category: "hair",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 6,
    name: "green hair bangs",
    layer: 3,
    source: "../../../../static/raw_sprites/spritesmith/customize/hair/hair_bangs_1_green.png",
    category: "hair",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 7,
    name: "aurora beard",
    layer: 5,
    source: "../../../../static/raw_sprites/spritesmith/customize/beards/hair_beard_1_aurora.png",
    category: "beard",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 8,
    name: "black beard",
    layer: 5,
    source: "../../../../static/raw_sprites/spritesmith/customize/beards/hair_beard_2_black.png",
    category: "beard",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 9,
    name: "midnight beard",
    layer: 5,
    source: "../../../../static/raw_sprites/spritesmith/customize/beards/hair_beard_2_midnight.png",
    category: "beard",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 10,
    name: "frost beard",
    layer: 5,
    source: "../../../../static/raw_sprites/spritesmith/customize/beards/hair_beard_1_frost.png",
    category: "beard",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 11,
    name: "midnight beard",
    layer: 5,
    source: "../../../../static/raw_sprites/spritesmith/customize/beards/hair_beard_3_midnight.png",
    category: "beard",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 12,
    name: " candicorn hair bangs",
    layer: 3,
    source: "../../../../static/raw_sprites/spritesmith/customize/hair/hair_bangs_2_candycorn.png",
    category: "hair",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 13,
    name: "orange hair bangs",
    layer: 3,
    source: "../../../../static/raw_sprites/spritesmith/customize/hair/hair_bangs_4_porange2.png",
    category: "hair",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 14,
    name: "light skin",
    layer: 1,
    source: "../../../../static/raw_sprites/spritesmith/customize/skin/skin_ddc994.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 15,
    name: "winterstar skin",
    layer: 1,
    source: "../../../../static/raw_sprites/spritesmith/customize/skin/skin_winterstar.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 16,
    name: "dark skin",
    layer: 1,
    source: "../../../../static/raw_sprites/spritesmith/customize/skin/skin_98461a.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 17,
    name: "dapper skin",
    layer: 1,
    source: "../../../../static/raw_sprites/spritesmith/customize/skin/skin_dapper.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },
  {
    number: 18,
    name: "white skin",
    layer: 1,
    source: "../../../../static/raw_sprites/spritesmith/customize/skin/skin_ea8349.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },
  {
    number: 19,
    name: "broad black shirt",
    layer: 2,
    source: "../../../../static/raw_sprites/spritesmith/customize/shirts/broad_shirt_black.png",
    category: "shirt",
    coordinates: [19,32],
    size: [85,85],
  },
  {
    number: 20,
    name: "broad shirt blue",
    layer: 2,
    source: "../../../../static/raw_sprites/spritesmith/customize/shirts/broad_shirt_blue.png",
    category: "shirt",
    coordinates: [19,32],
    size: [85,85],
  },
  {
    number: 21,
    name: "broad shirt fire",
    layer: 2,
    source: "../../../../static/raw_sprites/spritesmith/customize/shirts/broad_shirt_fire.png",
    category: "shirt",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 22,
    name: "broad green shirt",
    layer: 2,
    source: "../../../../static/raw_sprites/spritesmith/customize/shirts/broad_shirt_green.png",
    category: "shirt",
    coordinates: [19,32],
    size: [85,85],
  },
  {
    number: 23,
    name: "broad shirt ocean",
    layer: 2,
    source: "../../../../static/raw_sprites/spritesmith/customize/shirts/broad_shirt_ocean.png",
    category: "shirt",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 24,
    name: "slim black shirt",
    layer: 2,
    source: "../../../../static/raw_sprites/spritesmith/customize/shirts/slim_shirt_black.png",
    category: "shirt",
    coordinates: [19,32],
    size: [85,85],
  },
  {
    number: 20,
    name: "slim blue shirt",
    layer: 2,
    source: "../../../../static/raw_sprites/spritesmith/customize/shirts/slim_shirt_blue.png",
    category: "shirt",
    coordinates: [19,32],
    size: [85,85],
  },
  {
    number: 21,
    name: "slim fire shirt",
    layer: 2,
    source: "../../../../static/raw_sprites/spritesmith/customize/shirts/slim_shirt_fire.png",
    category: "shirt",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 22,
    name: "slim green shirt",
    layer: 2,
    source: "../../../../static/raw_sprites/spritesmith/customize/shirts/slim_shirt_green.png",
    category: "shirt",
    coordinates: [19,32],
    size: [85,85],
  },
  {
    number: 23,
    name: "slim ocean shirt",
    layer: 2,
    source: "../../../../static/raw_sprites/spritesmith/customize/shirts/slim_shirt_horizon.png",
    category: "shirt",
    coordinates: [19,32],
    size: [85,85],
  },
  ],


*/