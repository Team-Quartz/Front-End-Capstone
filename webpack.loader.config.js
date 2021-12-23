const loader = {
  module: {
     rules: [
     {
       test: /\.(jpe?g|png|gif|svg)$/i,
       use: [
         'img-loader'
         ]
     }
   ]
   }
 }

