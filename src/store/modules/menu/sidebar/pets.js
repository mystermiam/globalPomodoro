// PET VARIABLES
 var pet = [{  
    name: "Dressed-up water melon",
  number: 0,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1497446465/verkleidete_Wassermelone_fgucfh_qswtyf.png",
    layer: 5,
    coordinates: [0, 84],
    size: [52, 45],
  equipped: false,
  },{
    name: "white fox",
  number: 1,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1497446465/whitefox_hfsbft_j0iojq.png",
  layer: 5,
    coordinates: [0, 84],
    size: [54, 45],
  equipped: false,
  }, {  
    name: "blue fox",
  number: 2,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1498285418/foxBlue_juyx95.png",
    layer: 5,
    coordinates: [0, 84],
    size: [40, 34],
  equipped: false,
  },{
    // ONLY ONE WITH CHANGED COORDINATES SO FAR 
    name: "golden fox",
  number: 3,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1498285418/foxGold_lyva5x.png ",
  layer: 5,
  coordinates: [0, 84],
  size: [54, 45],
  equipped: true,
  }, {  
    name: "black bear",
  number: 4,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1498285418/BearBlack_kar4to.png",
    layer: 5,
    coordinates: [0, 84],
    size: [52, 45],
  equipped: false,
  }, {  
    name: "blue flying pig",
  number: 5,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1498285418/PigBlue_tnm2uy.png",
    layer: 5,
    coordinates: [0, 84],
    size: [85, 85],
  equipped: false,
  },{
    name: "green flying pig",
  number: 6,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1498285418/PigGreen_dskhns.png",
  layer: 5,
    coordinates: [0, 84],
    size: [54, 45],
  equipped: false,
  },      
],


export default {
  namespaced: true,
  state : {
      pet: pet,
      petSelected: "3",
      petEquipped: true,
      petSize: 5,
  },
  getters: {

  },
  actions: {

  },
  mutations: {

  }
}