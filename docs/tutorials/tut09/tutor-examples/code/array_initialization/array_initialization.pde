int[] empty = new int[10];

int[] oneToTen = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

println(empty);          // Prints > [0] 0, [1] 0, ... [9] 0

int i = 5;               // You can also use a variable for the index

println(empty[i]);       // Prints > 0 

println(oneToTen[i]);    // Prints > 6

                         // NOTE: index starts at zero!



// Arrays can have two or more dimensions

char[][] osAndXs = {

  {'o', 'x', ' '},

  {' ', ' ', 'o'},

  {'x', ' ', 'o'},

};

println(osAndXs[0][1]);  // Prints > o



empty[5] = 1000;         // empty is now [0,0,0,0,0,1000,0,0,0,0]

println(empty[5]);       // Prints > 1000

class Cookie{Cookie(){}}


Cookie[] cookieTin;      // Arrays can hold objects



