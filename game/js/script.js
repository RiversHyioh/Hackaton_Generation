$(document).ready(function() {

        /* Variables DOM*/
         var track = $("#track");
         var play = $("#start-btn");
         var myCar = $("#myCar");
         var dividers_first = $(".dividers-first");
         var dividers_second = $(".dividers-second");
      
         /* Variables de Juego */
         var speed = 10;
         var track_height = track.height();
         var track_width = track.width();
         var myCar_position_left = parseInt(myCar.css('left'));
         var myCar_position_bottom = parseInt(myCar.css('bottom'));
         var score_count = 0;
         /* Boton de play */
      
         play.click(function() {
      
          /* Esconder boton play luego de click */
          play.hide();
      
          /* Carro en la pista */
           /*Establece un intervalo que aumenta constantemente la propiedad "bottom" de CSS del elemento del automóvil
           en 3 píxeles cada 40 milisegundos hasta que el automóvil alcanza una posición que es el 5% de
           la altura de la pista desde la parte inferior. Una vez que el automóvil alcanza esta posición,
           el intervalo se borra y la posición final del automóvil se almacena en la variable
           'myCar_position_bottom'. */
           var start_the_car = setInterval(function() {
      
             if (myCar_position_bottom > 0.05*track_height){
                 clearInterval(start_the_car);
                 myCar_position_bottom = ParseInt(myCar.css('bottom'));
             }
      
             myCar.css('bottom',myCar_position_bottom+=3);
      
           } , 40 );
      
           /* Lineas divisorias */
           var dividers_first_current_position = parseInt(dividers_first.css('top'));
           var dividers_second_current_position = parseInt(dividers_second.css('top'));
      
           var divider_speed = 10; //Velocidad de lineas
      /* Animacion de movimiento representado en dos div por las variables `dividers_first` y
           `dividers_second`) en la pista. Verifica si la
           posición actual de cada divisor es mayor que la altura de la
           pista y, de ser así, restablece la posición del divisor a la
           parte superior de la pista. Luego, los divisores se mueven
           por la pista a cierta velocidad (representada por la variable
           `divider_speed`) cada 20 milisegundos. */
      
           var dividers_moving = setInterval(
           function() {
      
         
              if(dividers_first_current_position >= track_height){
                  dividers_first_current_position = parseInt(dividers_second.css('top')) - dividers_second.height() + 18;
                  dividers_first.css( 'top' , dividers_first_current_position);
              }
      
            else  if(dividers_second_current_position >= track_height){
                  dividers_second_current_position = parseInt(dividers_first.css('top')) - dividers_first.height() + 18;
                  dividers_second.css( 'top' , dividers_second_current_position);
              }
      
      
              dividers_first.css('top' , dividers_first_current_position+= divider_speed );
              dividers_second.css('top' , dividers_second_current_position+= divider_speed );
      
      
           } , 20 );
      
      
           /* Carro inicia despues de 3 seg de play*/
           var horizontal_shift = track.width()/3;
           var vertical_shift = 4;
           var myCar_height = parseInt(myCar.css('height'));
      
      /*   Verifica qué tecla de flecha se presionó (izquierda, derecha, arriba o
           abajo) y mueve un elemento de automóvil en la pantalla en consecuencia. El
           automóvil solo puede moverse dentro de los límites de un elemento de vía, que está
           definido por las variables track_width y track_height. La cantidad de
           desplazamiento horizontal y vertical para cada pulsación de tecla está definida por
           las variables horizontal_shift y vertical_shift. */
           setTimeout( function() {
               $(document).on('keydown' , function(e) {
                   if( e.which === 37)                     /* 37 Flecha Abajo */
                   {
                      if ( myCar_position_left - horizontal_shift > 0 )
                         myCar.css('left',myCar_position_left-= horizontal_shift);
                   }
                   else if( e.which === 39)                 /* 39 Flecha Derecha */
                   {
                       if ( track_width - (myCar_position_left + horizontal_shift) > 0 )
                         myCar.css('left', myCar_position_left+= horizontal_shift);
                   }
                   else if(e.which === 38)                /* 38 Flecha Arriba */
                   {
                      if( track_height - myCar_position_bottom - myCar_height > 0)
                         myCar.css( 'bottom' , myCar_position_bottom+= vertical_shift);
                   }
                   else if(e.which === 40)                 /* 40 Flecha abajo */
                   {
                     if( myCar_position_bottom > 0)
                        myCar.css( 'bottom' ,myCar_position_bottom-= vertical_shift );
                   }
               });
      
           },3000);
      
      
          /* Carros contricantes */
          /*Se definen las variables y selecciona elementos del documento HTML usando jQuery.Selecciona dos bloques de autos para evitar en un juego, cada uno con tres
          elementos de autos individuales. Ademas establece la velocidad a la que aparecerán los autos y
          una variable para el conteo de niveles. */
          var car_to_avoid_block1 = $("#first-row-to-avoid");
          var car_to_avoid_block1_height = car_to_avoid_block1.height();
          var car_to_avoid_block1_current_position = parseInt(car_to_avoid_block1.css('top'));
          var car_to_avoid_block1_car1 = $('#first-row-to-avoid #carToAvoid1');
          var car_to_avoid_block1_car2 = $('#first-row-to-avoid #carToAvoid2');
          var car_to_avoid_block1_car3 = $('#first-row-to-avoid #carToAvoid3');
      
          var car_to_avoid_block2 = $('#second-row-to-avoid');//Bloque de dos carros.
          var car_to_avoid_block2_height = car_to_avoid_block2.height();
          var car_to_avoid_block2_current_position = parseInt(car_to_avoid_block2.css('top'));
          var car_to_avoid_block2_car1 = $('#second-row-to-avoid #carToAvoid1');
          var car_to_avoid_block2_car2 = $('#second-row-to-avoid #carToAvoid2');
          var car_to_avoid_block2_car3 = $('#second-row-to-avoid #carToAvoid3');
      
          var cars_to_avoid_speed = 4;//Velocidad de aparicion de carros
          var random ;//Aparicion de cantidad de carros uno o dos.
          var lvl_count = 1;   // Niveles
      
      
      
          setTimeout(function(){
                cars_to_avoid = setInterval(function() {//Interaccion con los otros carros.
      
                 if (collision(myCar,car_to_avoid_block1_car1) || collision(myCar,car_to_avoid_block1_car2) || collision(myCar,car_to_avoid_block1_car3) || collision(myCar,car_to_avoid_block2_car1) || collision(myCar,car_to_avoid_block2_car2) || collision(myCar,car_to_avoid_block2_car3))
                    {
                         stopTheGame();//Si colisiona con cualquier carro para el juego.
      
                    }
                else {
      
                  /* Verifica si la variable `lvl_count` es menor que 2. Si lo es, verifica si la
                  variable `car_to_avoid_block1_current_position` es mayor que la variable `track_height`.
                  Si es así, oculta tres elementos de coche (`car_to_avoid_block1_car1`,
                  `car_to_avoid_block1_car2` y `car_to_avoid_block1_car3`) y muestra aleatoriamente uno de
                  ellos. Luego establece la propiedad CSS `top` del elemento con el ID
                  `car_to_avoid_block1` en negativo */
      
                  if( lvl_count < 2 )
                   {
      
                       if( car_to_avoid_block1_current_position > track_height)//Si no co
                          {
      
                            car_to_avoid_block1_car1.hide();
                            car_to_avoid_block1_car2.hide();
                            car_to_avoid_block1_car3.hide();
                            random = Math.floor(Math.random()*3);
      
                            switch(random){
                                 case 0: car_to_avoid_block1_car1.show();
                                         break;
                                 case 1: car_to_avoid_block1_car2.show();
                                         break;
                                 case 2: car_to_avoid_block1_car3.show();
                                         break;
                                 default: alert("error");
                            }
      
                            car_to_avoid_block1.css('top',car_to_avoid_block1_current_position=-car_to_avoid_block1_height-35);
      
                            lvl_count++;
                          }
      
                       car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position+=cars_to_avoid_speed);
      
      
                   }
                  /* Mueve el bloque de autos
                  verticalmente en una pista. Comprueba si el recuento de niveles está entre 2 y 5, y si
                  es así, comprueba si la posición actual del bloque de coches está por encima de la
                  altura de la pista. Si es así, oculta los autos en el bloque, genera un número aleatorio
                  entre 0 y 2 y muestra dos de los tres autos en el bloque según el número aleatorio.
                  Luego establece la posición superior del bloque en un valor negativo e incrementa el
                  recuento de niveles. Finalmente, se establece */
                  else if(lvl_count >= 2 && lvl_count <= 5)
                    {
      
                      if( car_to_avoid_block1_current_position > track_height)
                         {
                           if (lvl_count == 3)
                             { cars_to_avoid_speed++;
                               divider_speed++;
                             }
      
                           car_to_avoid_block1_car1.hide();
                           car_to_avoid_block1_car2.hide();
                           car_to_avoid_block1_car3.hide();
                           random = Math.floor(Math.random()*3);
      
                           switch(random){
                                case 0: car_to_avoid_block1_car1.show();
                                        car_to_avoid_block1_car2.show();
                                        break;
                                case 1: car_to_avoid_block1_car2.show();
                                        car_to_avoid_block1_car3.show();
                                        break;
                                case 2: car_to_avoid_block1_car3.show();
                                        car_to_avoid_block1_car1.show();
                                        break;
                                default: alert("error");
                           }
      
                           car_to_avoid_block1.css('top',car_to_avoid_block1_current_position=-car_to_avoid_block1_height-35);
      
                           lvl_count++;
                         }
      
                      car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position+=cars_to_avoid_speed);
      
      
                    }
                 /* Comprueba si el recuento de niveles está entre 6 y 8, y si es así, está actualizando
                 las posiciones de dos bloques de autos que el jugador debe evitar. El código selecciona
                 aleatoriamente qué autos mostrar en cada bloque y aumenta la velocidad de los autos y el
                 divisor entre los carriles si el recuento de niveles es 7. Luego, el código actualiza las
                 posiciones de los autos y el divisor en función de su velocidad actual. */
                 else if(lvl_count > 5 && lvl_count <=8)
                   {
      
      
                      if (car_to_avoid_block1_current_position > track_height && car_to_avoid_block2_current_position > track_height)
                        {
                            if (lvl_count == 7)
                              { cars_to_avoid_speed += 2;
                                divider_speed += 2;
                              }
      
                            car_to_avoid_block2_car1.hide();
                            car_to_avoid_block2_car2.hide();
                            car_to_avoid_block2_car3.hide();
                            random = Math.floor(Math.random()*3);
      
                            switch(random){
                                    case 0: car_to_avoid_block2_car1.show();
                                            car_to_avoid_block2_car2.show()
                                            break;
                                    case 1: car_to_avoid_block2_car2.show();
                                            car_to_avoid_block2_car3.show();
                                            break;
                                    case 2: car_to_avoid_block2_car3.show();
                                            car_to_avoid_block2_car1.show();
                                            break;
                                            default: alert("error");
                             }
      
      
      
                            car_to_avoid_block1_car1.hide();
                            car_to_avoid_block1_car2.hide();
                            car_to_avoid_block1_car3.hide();
                            random = Math.floor(Math.random()*3);
      
                            switch(random){
                                   case 0: car_to_avoid_block1_car1.show();
                                           break;
                                   case 1: car_to_avoid_block1_car2.show();
                                           break;
                                   case 2: car_to_avoid_block1_car3.show();
                                           break;
                                   default: alert("error");
                            }
      
                           car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position = -123 );
                           car_to_avoid_block2.css('top' , car_to_avoid_block2_current_position = -(369+Math.floor(Math.random()*180))) ;
      
                           lvl_count++;
                        }
      
                        car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position+=cars_to_avoid_speed);
                        car_to_avoid_block2.css('top' , car_to_avoid_block2_current_position+=cars_to_avoid_speed);
      
      
                    }
      
                   /* 
                   Se verifica si el conteo de niveles está entre 9 y 12, y si es así, verifica si ambos bloques de autos están actualmente
                   por encima de la altura de la pista. Si lo son, selecciona aleatoriamente qué autos en
                   cada bloque serán visibles, oculta los demás y establece la posición de los bloques
                   para que estén por encima de la pista. También aumenta la velocidad de los coches a
                   evitar y la divisoria entre carriles si */
                    else if(lvl_count > 8 && lvl_count <=12)
                    {
      
      
                      if (car_to_avoid_block1_current_position > track_height && car_to_avoid_block2_current_position > track_height)
                        {
                            if (lvl_count == 10)
                              {cars_to_avoid_speed+=2;
                               divider_speed+=2;
                              }
      
                            car_to_avoid_block2_car1.hide();
                            car_to_avoid_block2_car2.hide();
                            car_to_avoid_block2_car3.hide();
                            random = Math.floor(Math.random()*3);
      
                            switch(random){
                                    case 0: car_to_avoid_block2_car1.show();
                                            car_to_avoid_block2_car2.show()
                                            break;
                                    case 1: car_to_avoid_block2_car2.show();
                                            car_to_avoid_block2_car3.show();
                                            break;
                                    case 2: car_to_avoid_block2_car3.show();
                                            car_to_avoid_block2_car1.show();
                                            break;
                                            default: alert("error");
                             }
      
      
      
                            car_to_avoid_block1_car1.hide();
                            car_to_avoid_block1_car2.hide();
                            car_to_avoid_block1_car3.hide();
                            random = Math.floor(Math.random()*3);
      
                            switch(random){
                                   case 0: car_to_avoid_block1_car1.show();
                                           car_to_avoid_block1_car2.show();
                                           break;
                                   case 1: car_to_avoid_block1_car2.show();
                                           car_to_avoid_block1_car3.show();
                                           break;
                                   case 2: car_to_avoid_block1_car3.show();
                                           car_to_avoid_block1_car1.show();
                                           break;
                                   default: alert("error");
                            }
      
      
                           car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position = -143 );
                           car_to_avoid_block2.css('top' , ( car_to_avoid_block2_current_position = -(389+Math.abs(Math.floor(Math.random()*180 ) ) ) ) ) ;
                           lvl_count++;
                        }
      
                        car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position+=cars_to_avoid_speed);
                        car_to_avoid_block2.css('top' , car_to_avoid_block2_current_position+=cars_to_avoid_speed);
      
                    }
                    /* Verifica si el recuento de niveles es superior a 12 y, de ser así, está
                    actualizando las posiciones de dos bloques de coches que el jugador debe evitar. El
                    código aumenta la velocidad de los autos para evitar y la velocidad del divisor cada
                    dos niveles. También muestra aleatoriamente diferentes combinaciones de autos en cada
                    bloque. Finalmente, actualiza las posiciones de los dos bloques de autos y aumenta su
                    posición superior según la velocidad de los autos a evitar. */
                    else if(lvl_count > 12 )
                    {
      
      
                      if (car_to_avoid_block1_current_position > track_height && car_to_avoid_block2_current_position > track_height)
                        {
                            if (lvl_count%2==0)
                              {cars_to_avoid_speed++;
                               divider_speed++;
                              }
      
                            car_to_avoid_block2_car1.hide();
                            car_to_avoid_block2_car2.hide();
                            car_to_avoid_block2_car3.hide();
                            random = Math.floor(Math.random()*3);
      
                            switch(random){
                                    case 0: car_to_avoid_block2_car1.show();
                                            car_to_avoid_block2_car2.show()
                                            break;
                                    case 1: car_to_avoid_block2_car2.show();
                                            car_to_avoid_block2_car3.show();
                                            break;
                                    case 2: car_to_avoid_block2_car3.show();
                                            car_to_avoid_block2_car1.show();
                                            break;
                                            default: alert("error");
                             }
      
      
      
                            car_to_avoid_block1_car1.hide();
                            car_to_avoid_block1_car2.hide();
                            car_to_avoid_block1_car3.hide();
                            random = Math.floor(Math.random()*3);
      
                            switch(random){
                                   case 0: car_to_avoid_block1_car1.show();
                                           car_to_avoid_block1_car2.show();
                                           break;
                                   case 1: car_to_avoid_block1_car2.show();
                                           car_to_avoid_block1_car3.show();
                                           break;
                                   case 2: car_to_avoid_block1_car3.show();
                                           car_to_avoid_block1_car1.show();
                                           break;
                                   default: alert("error");
                            }
      
                           car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position = -143);
                           car_to_avoid_block2.css('top' ,car_to_avoid_block2_current_position = -(395+Math.floor(Math.random()*50 ) ) );
                           lvl_count++;
                        }
      
                        car_to_avoid_block1.css('top' , car_to_avoid_block1_current_position+=cars_to_avoid_speed);
                        car_to_avoid_block2.css('top' , car_to_avoid_block2_current_position+=cars_to_avoid_speed);
      
                    }
      
                  }
      
               },20);
      
      
          } , 6000);
      
      
      
      
          /* Puntuacion */
         /* Se establece un tiempo de espera de 6 segundos antes de iniciar una función
         setInterval que aumenta el valor de una variable llamada "score_count" en 20 cada 4 segundos.  */
          setTimeout( function(){
      
            count_the_score =  setInterval(function(){
                  score_count+= 20;
              } , 4000 );
      
          } , 6000 );
      
      
      
          /* Colision entre carros*/
           /*Utiliza los divs para validar la colision,si hay una colisión, la función
           * devuelve "verdadero", de lo contrario, devuelve "falso".
           */
          function collision($div1, $div2){//.
             var x1 = $div1.offset().left;
             var y1 = $div1.offset().top;
             var h1 = $div1.outerHeight(true);
             var w1 = $div1.outerWidth(true);
             var b1 = y1 + h1;
             var r1 = x1 + w1;
             var x2 = $div2.offset().left;
             var y2 = $div2.offset().top;
             var h2 = $div2.outerHeight(true);
             var w2 = $div2.outerWidth(true);
             var b2 = y2 + h2;
             var r2 = x2 + w2;
      
             if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
                return true;
             }
      
      
      
          /* Funcion para detener el juego */
         /**
          * Borrando intervalos, ocultando elementos, mostrando la puntuación y
          recargando la página cuando el usuario hace clic en el botón replay.
          */
          function stopTheGame(){
      
              clearInterval(window.cars_to_avoid);      /* Detiene la ejecucion de los carros y esconde luego el carro*/
              clearInterval(dividers_moving);
              clearInterval(window.count_the_score);
      
              myCar.hide();
              car_to_avoid_block1.hide();
                    car_to_avoid_block2.hide();
                           dividers_first.hide();
                           dividers_second.hide();
      
      
             $('#result').css('display','block');
                   $('#result #score').html("SCORE</br>" + score_count);//Muestra el resultado 
      
      
                  $('#result i').click(function() {
                 location.reload(window.location.href);
                         });
      
      
          }
      
      
         });
      
      
      
      });
      