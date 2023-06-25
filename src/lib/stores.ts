import { readable, writable } from 'svelte/store'
export const floatData =
[
	["Character Name", "Start Address", "Horizontal Reach Near", "Horizontal Reach Far", "Vertical Reach Front", "Vertical Reach Back", "Easy Batting Spot Horizontal", "Easy Batting Spot Vertical", "Box Movement Speed", "Pitch Height", "Trimmed Bat"],
  [null,null,0x0,0x4,0x8,0xC,0x10,0x14,0x18,0x1C,0x20,null  ],
  ["Mario","807B84F8",-0.65,0.55,-0.2,1.5,-2.1,-1,0.05,1,0,0  ],
  ["Luigi","807B851C",-0.65,0.65,0.3,1.9,-1.8,-1,0.05,1,0,1  ],
  ["DK","807B8540",-0.55,0.65,0.4,1.4,-2.65,-1,0.05,1,1,2  ],
  ["Diddy","807B8564",-0.55,0.55,-0.3,1.8,-1.7,-1,0.05,1,0,3  ],
  ["Peach","807B8588",-0.75,0.5,0.1,1.5,-1.9,-1.3,0.05,1,0,4  ],
  ["Daisy","807B85AC",-0.65,0.6,-0.2,1.6,-2,-1.3,0.05,1,0,5  ],
  ["Yoshi","807B85D0",-0.65,0.65,0.2,1.5,-2.05,-1,0.05,1,0,6  ],
  ["Baby Mario","807B85F4",-0.75,0.55,-0.5,1.7,-1.8,-1.3,0.05,1,0,7  ],
  ["Baby Luigi","807B8618",-0.65,0.55,-0.1,1.8,-1.9,-1.15,0.05,1,0,8  ],
  ["Bowser","807B863C",-0.55,1.45,0.1,0.2,-3.6,-1,0.05,1,0,9  ],
  ["Wario","807B8660",-0.55,0.75,0.4,1.5,-2.4,-1.6,0.05,1,0,10  ],
  ["Waluigi","807B8684",-0.55,0.85,0.3,1.5,-2.3,-1,0.05,1,0,11  ],
  ["Koopa(R)","807B86A8",-0.5,0.55,-0.2,1.6,-2.15,-1,0.05,1,0,12  ],
  ["Toad(R)","807B86CC",-0.95,0.55,-0.1,1.8,-1.7,-1,0.05,0.75,0,13  ],
  ["Boo","807B86F0",-0.45,0.85,-0.1,1.6,-2.4,-1,0.05,1.1,0,14  ],
  ["Toadette","807B8714",-0.65,0.5,-0.1,1.7,-1.8,-1,0.05,0.75,0,15  ],
  ["Shy Guy(R)","807B8738",-0.55,0.65,-0.1,1.4,-2.5,-1,0.05,1,0,16  ],
  ["Birdo","807B875C",-0.55,0.55,0.1,1.8,-1.9,-1,0.05,1,0,17  ],
  ["Monty","807B8780",-0.55,0.85,0.3,1.4,-2.5,-1,0.05,1,0,18  ],
  ["Bowser Jr","807B87A4",-0.65,0.65,0.2,1.4,-2.5,-1,0.05,1,0,19  ],
  ["Paratroopa(R)","807B87C8",-0.55,0.65,-0.2,1.6,-2.2,-1,0.05,1,0,20  ],
  ["Pianta(B)","807B87EC",-0.45,0.85,0.5,1.3,-2.3,-1,0.05,1,0,21  ],
  ["Pianta(R)","807B8810",-0.45,0.85,0.5,1.3,-2.3,-1,0.05,1,0,22  ],
  ["Pianta(Y)","807B8834",-0.45,0.85,0.5,1.3,-2.3,-1,0.05,1,0,23  ],
  ["Noki(B)","807B8858",-0.65,0.65,0.1,1.4,-2,-1.2,0.05,1,0,24  ],
  ["Noki(R)","807B887C",-0.65,0.65,0.1,1.4,-2,-1.2,0.05,1,0,25  ],
  ["Noki(G)","807B88A0",-0.65,0.65,0.1,1.4,-2,-1.2,0.05,1,0,26  ],
  ["Bro(H)","807B88C4",-0.65,0.65,-0.2,1.2,-1.7,-1,0.05,1,1,27  ],
  ["Toadsworth","807B88E8",-0.65,0.55,-0.1,1.6,-1.75,-1,0.05,0.75,1,28  ],
  ["Toad(B)","807B890C",-0.45,0.45,-0.6,1.2,-1.7,-1,0.05,0.75,0,29  ],
  ["Toad(Y)","807B8930",-0.45,0.45,-0.6,1.2,-1.7,-1,0.05,0.75,0,30  ],
  ["Toad(G)","807B8954",-0.45,0.45,-0.6,1.2,-1.7,-1,0.05,0.75,0,31  ],
  ["Toad(P)","807B8978",-0.45,0.45,-0.6,1.2,-1.7,-1,0.05,0.75,0,32  ],
  ["Magikoopa(B)","807B899C",-0.6,0.7,-0.2,1.5,-2,-1,0.05,1,0,33  ],
  ["Magikoopa(R)","807B89C0",-0.6,0.7,-0.2,1.5,-2,-1,0.05,1,0,34  ],
  ["Magikoopa(G)","807B89E4",-0.6,0.7,-0.2,1.5,-2,-1,0.05,1,0,35  ],
  ["Magikoopa(Y)","807B8A08",-0.6,0.7,-0.2,1.5,-2,-1,0.05,1,0,36  ],
  ["King Boo","807B8A2C",-0.65,0.65,-0.1,1.8,-2.3,-1,0.05,1.2,0,37  ],
  ["Petey","807B8A50",-0.65,0.65,-0.2,1.2,-1.9,-1.4,0.05,1.1,0,38  ],
  ["Dixie","807B8A74",-0.65,0.55,0.2,1.7,-1.6,-1,0.05,1.2,0,39  ],
  ["Goomba","807B8A98",-0.55,0.55,0,1.5,-2.1,-1,0.05,0.75,0,40  ],
  ["Paragoomba","807B8ABC",-0.55,0.55,-0.2,1.4,-2.3,-1,0.05,1,0,41  ],
  ["Koopa(G)","807B8AE0",-0.5,0.55,-0.2,1.6,-2.15,-1,0.05,1,0,42  ],
  ["Paratroopa(G)","807B8B04",-0.55,0.65,-0.2,1.6,-2.1,-1,0.05,1,0,43  ],
  ["Shy Guy(B)","807B8B28",-0.55,0.65,-0.1,1.4,-2.5,-1,0.05,1,0,44  ],
  ["Shy Guy(Y)","807B8B4C",-0.55,0.65,-0.1,1.4,-2.5,-1,0.05,1,0,45  ],
  ["Shy Guy(G)","807B8B70",-0.55,0.65,-0.1,1.4,-2.5,-1,0.05,1,0,46  ],
  ["Shy Guy(Bk)","807B8B94",-0.55,0.65,-0.1,1.4,-2.5,-1,0.05,1,0,47  ],
  ["Dry Bones(Gy)","807B8BB8",-0.75,0.55,-0.1,1.3,-1.9,-1.1,0.05,1,0,48  ],
  ["Dry Bones(G)","807B8BDC",-0.75,0.55,-0.1,1.3,-1.9,-1.1,0.05,1,0,49  ],
  ["Dry Bones(R)","807B8C00",-0.75,0.55,-0.1,1.3,-1.9,-1.1,0.05,1,0,50  ],
  ["Dry Bones(B)","807B8C24",-0.75,0.55,-0.1,1.3,-1.9,-1.1,0.05,1,0,51  ],
  ["Bro(F)","807B8C48",-0.65,0.65,-0.2,1.2,-1.7,-1,0.05,1,1,52  ],
  ["Bro(B)","807B8C6C",-0.65,0.65,-0.2,1.2,-1.7,-1,0.05,1,1,53  ]
];

export const floatRead = readable(floatData)
export const floatWrite = writable(structuredClone(floatData))

export const chemData =
[
  ["Char Name","Starting Addr","Mario","Luigi","DK","Diddy","Peach","Daisy","Yoshi","Baby Mario","Baby Luigi","Bowser","Wario","Waluigi","Koopa(R)","Toad(R)","Boo","Toadette","Shy Guy(R)","Birdo","Monty","Bowser Jr","Paratroopa(R)","Pianta(B)","Pianta(R)","Pianta(Y)","Noki(B)","Noki(R)","Noki(G)","Bro(H)","Toadsworth","Toad(B)","Toad(Y)","Toad(G)","Toad(P)","Magikoopa(B)","Magikoopa(R)","Magikoopa(G)","Magikoopa(Y)","King Boo","Petey","Dixie","Goomba","Paragoomba","Koopa(G)","Paratroopa(G)","Shy Guy(B)","Shy Guy(Y)","Shy Guy(G)","Shy Guy(Bk)","Dry Bones(Gy)","Dry Bones(G)","Dry Bones(R)","Dry Bones(B)","Bro(F)","Bro(B)"  ],
  [null,null,"0x3b","0x3c","0x3d","0x3e","0x3f","0x40","0x41","0x42","0x43","0x44","0x45","0x46","0x47","0x48","0x49","0x4a","0x4b","0x4c","0x4d","0x4e","0x4f","0x50","0x51","0x52","0x53","0x54","0x55","0x56","0x57","0x58","0x59","0x5a","0x5b","0x5c","0x5d","0x5e","0x5f","0x60","0x61","0x62","0x63","0x64","0x65","0x66","0x67","0x68","0x69","0x6a","0x6b","0x6c","0x6d","0x6e","0x6f","0x70"  ],
  ["Mario","8034e9a0","50","99","30","59","95","88","90","87","89","15","10","20","65","82","50","81","48","63","71","25","62","86","86","86","85","85","85","38","76","82","82","82","82","40","40","40","40","49","35","55","42","43","65","62","48","48","48","48","32","32","32","32","38","38"  ],
  ["Luigi","8034ea40","99","50","35","55","90","95","86","89","87","25","20","10","62","81","15","82","47","60","72","30","65","83","83","83","80","80","80","39","75","81","81","81","81","51","51","51","51","11","34","57","40","41","62","65","47","47","47","47","28","28","28","28","39","39"  ],
  ["DK","8034eae0","30","35","50","99","22","24","77","58","57","41","59","34","67","65","68","61","50","40","83","69","72","55","55","55","45","45","45","75","63","65","65","65","65","29","29","29","29","81","91","90","80","79","67","72","50","50","50","50","43","43","43","43","75","75"  ],
  ["Diddy","8034eb80","59","55","99","50","64","68","72","79","78","34","33","32","75","67","60","65","66","45","77","71","70","46","46","46","56","56","56","58","62","67","67","67","67","57","57","57","57","48","52","95","91","80","75","70","66","66","66","66","44","44","44","44","58","58"  ],
  ["Peach","8034ec20","95","90","22","64","50","97","83","85","80","9","14","25","60","93","31","94","58","84","45","82","57","87","87","87","88","88","88","32","96","93","93","93","93","43","43","43","43","41","5","70","44","40","60","57","58","58","58","58","35","35","35","35","32","32"  ],
  ["Daisy","8034ecc0","88","95","24","68","97","50","80","82","85","11","25","15","57","86","34","87","55","81","43","45","60","77","77","77","83","83","83","33","79","86","86","86","86","41","41","41","41","40","6","72","46","47","57","60","55","55","55","55","30","30","30","30","33","33"  ],
  ["Yoshi","8034ed60","90","86","77","72","83","80","50","95","94","37","50","54","78","76","53","75","45","97","73","48","74","89","89","89","82","82","82","40","71","76","76","76","76","49","49","49","49","66","42","60","67","68","78","74","45","45","45","45","46","46","46","46","40","40"  ],
  ["Baby Mario","8034ee00","87","89","58","79","85","82","95","50","99","19","12","22","66","84","14","86","10","75","60","35","61","76","76","76","77","77","77","28","88","84","84","84","84","34","34","34","34","21","24","71","45","42","66","61","10","10","10","10","33","33","33","33","28","28"  ],
  ["Baby Luigi","8034eea0","89","87","57","78","80","85","94","99","50","18","22","12","64","83","13","84","15","70","56","41","77","79","79","79","81","81","81","27","86","83","83","83","83","33","33","33","33","10","23","73","47","44","64","77","15","15","15","15","34","34","34","34","27","27"  ],
  ["Bowser","8034ef40","15","25","41","34","9","11","37","19","18","50","65","60","91","10","80","5","85","71","59","99","90","30","30","30","35","35","35","95","13","10","10","10","10","88","88","88","88","75","66","33","73","72","91","90","85","85","85","85","92","92","92","92","95","95"  ],
  ["Wario","8034efe0","10","20","59","33","14","25","50","12","22","65","50","99","58","15","90","16","80","30","70","81","55","39","39","39","48","48","48","84","24","15","15","15","15","71","71","71","71","82","63","21","62","61","58","55","80","80","80","80","42","42","42","42","84","84"  ],
  ["Waluigi","8034f080","20","10","34","32","25","15","54","22","12","60","99","50","55","16","88","17","78","35","67","77","58","42","42","42","47","47","47","86","23","16","16","16","16","91","91","91","91","80","51","24","61","63","55","58","78","78","78","78","48","48","48","48","86","86"  ],
  ["Koopa(R)","8034f120","65","62","67","75","60","57","78","66","64","91","58","55","50","39","84","36","70","68","80","87","99","53","53","53","71","71","71","85","31","39","39","39","39","81","81","81","81","69","44","63","88","86","50","99","70","70","70","70","90","90","90","90","85","85"  ],
  ["Toad(R)","8034f1c0","82","81","65","67","93","86","76","84","83","10","15","16","39","50","25","99","53","74","52","46","38","85","85","85","78","78","78","35","92","50","50","50","50","36","36","36","36","37","31","64","66","60","39","38","53","53","53","53","29","29","29","29","35","35"  ],
  ["Boo","8034f260","50","15","68","60","31","34","53","14","13","80","90","88","84","25","50","23","86","83","55","70","89","49","49","49","65","65","65","71","27","25","25","25","25","95","95","95","95","98","64","51","82","87","84","89","86","86","86","86","85","85","85","85","71","71"  ],
  ["Toadette","8034f300","81","82","61","65","94","87","75","86","84","5","16","17","36","99","23","50","51","80","49","47","35","78","78","78","74","74","74","34","91","99","99","99","99","31","31","31","31","32","30","62","64","59","36","35","51","51","51","51","27","27","27","27","34","34"  ],
  ["Shy Guy(R)","8034f3a0","48","47","50","66","58","55","45","10","15","85","80","78","70","53","86","51","50","90","91","83","75","60","60","60","62","62","62","72","46","53","53","53","53","84","84","84","84","65","33","67","52","54","70","75","50","50","50","50","68","68","68","68","72","72"  ],
  ["Birdo","8034f440","63","60","40","45","84","81","97","75","70","71","30","35","68","74","83","80","90","50","42","38","64","51","51","51","67","67","67","73","69","74","74","74","74","37","37","37","37","79","92","89","54","55","68","64","90","90","90","90","56","56","56","56","73","73"  ],
  ["Monty","8034f4e0","71","72","83","77","45","43","73","60","56","59","70","67","80","52","55","49","91","42","50","76","82","68","68","68","40","40","40","25","51","52","52","52","52","39","39","39","39","47","37","74","95","90","80","82","91","91","91","91","81","81","81","81","25","25"  ],
  ["Bowser Jr","8034f580","25","30","69","71","82","45","48","35","41","99","81","77","87","46","70","47","83","38","76","50","80","20","20","20","24","24","24","91","52","46","46","46","46","90","90","90","90","58","68","66","55","51","87","80","83","83","83","83","84","84","84","84","91","91"  ],
  ["Paratroopa(R)","8034f620","62","65","72","70","57","60","74","61","77","90","55","58","99","38","89","35","75","64","82","80","50","50","50","50","68","68","68","83","30","38","38","38","38","79","79","79","79","73","43","59","85","91","99","50","75","75","75","75","88","88","88","88","83","83"  ],
  ["Pianta(B)","8034f6c0","86","83","55","46","87","77","89","76","79","30","39","42","53","85","49","78","60","51","68","20","50","50","50","50","98","98","98","69","72","85","85","85","85","61","61","61","61","54","15","44","38","36","53","50","60","60","60","60","58","58","58","58","69","69"  ],
  ["Pianta(R)","8034f760","86","83","55","46","87","77","89","76","79","30","39","42","53","85","49","78","60","51","68","20","50","50","50","50","98","98","98","69","72","85","85","85","85","61","61","61","61","54","15","44","38","36","53","50","60","60","60","60","58","58","58","58","69","69"  ],
  ["Pianta(Y)","8034f800","86","83","55","46","87","77","89","76","79","30","39","42","53","85","49","78","60","51","68","20","50","50","50","50","98","98","98","69","72","85","85","85","85","61","61","61","61","54","15","44","38","36","53","50","60","60","60","60","58","58","58","58","69","69"  ],
  ["Noki(B)","8034f8a0","85","80","45","56","88","83","82","77","81","35","48","47","71","78","65","74","62","67","40","24","68","98","98","98","50","50","50","42","73","78","78","78","78","54","54","54","54","38","10","75","70","69","71","68","62","62","62","62","55","55","55","55","42","42"  ],
  ["Noki(R)","8034f940","85","80","45","56","88","83","82","77","81","35","48","47","71","78","65","74","62","67","40","24","68","98","98","98","50","50","50","42","73","78","78","78","78","54","54","54","54","38","10","75","70","69","71","68","62","62","62","62","55","55","55","55","42","42"  ],
  ["Noki(G)","8034f9e0","85","80","45","56","88","83","82","77","81","35","48","47","71","78","65","74","62","67","40","24","68","98","98","98","50","50","50","42","73","78","78","78","78","54","54","54","54","38","10","75","70","69","71","68","62","62","62","62","55","55","55","55","42","42"  ],
  ["Bro(H)","8034fa80","38","39","75","58","32","33","40","28","27","95","84","86","85","35","71","34","72","73","25","91","83","69","69","69","42","42","42","50","36","35","35","35","35","87","87","87","87","76","81","54","78","77","85","83","72","72","72","72","82","82","82","82","50","50"  ],
  ["Toadsworth","8034fb20","76","75","63","62","96","79","71","88","86","13","24","23","31","92","27","91","46","69","51","52","30","72","72","72","73","73","73","36","50","92","92","92","92","25","25","25","25","39","28","61","60","58","31","30","46","46","46","46","38","38","38","38","36","36"  ],
  ["Toad(B)","8034fbc0","82","81","65","67","93","86","76","84","83","10","15","16","39","50","25","99","53","74","52","46","38","85","85","85","78","78","78","35","92","50","50","50","50","36","36","36","36","37","31","64","66","60","39","38","53","53","53","53","29","29","29","29","35","35"  ],
  ["Toad(Y)","8034fc60","82","81","65","67","93","86","76","84","83","10","15","16","39","50","25","99","53","74","52","46","38","85","85","85","78","78","78","35","92","50","50","50","50","36","36","36","36","37","31","64","66","60","39","38","53","53","53","53","29","29","29","29","35","35"  ],
  ["Toad(G)","8034fd00","82","81","65","67","93","86","76","84","83","10","15","16","39","50","25","99","53","74","52","46","38","85","85","85","78","78","78","35","92","50","50","50","50","36","36","36","36","37","31","64","66","60","39","38","53","53","53","53","29","29","29","29","35","35"  ],
  ["Toad(P)","8034fda0","82","81","65","67","93","86","76","84","83","10","15","16","39","50","25","99","53","74","52","46","38","85","85","85","78","78","78","35","92","50","50","50","50","36","36","36","36","37","31","64","66","60","39","38","53","53","53","53","29","29","29","29","35","35"  ],
  ["Magikoopa(B)","8034fe40","40","51","29","57","43","41","49","34","33","88","71","91","81","36","95","31","84","37","39","90","79","61","61","61","54","54","54","87","25","36","36","36","36","50","50","50","50","44","38","35","65","67","81","79","84","84","84","84","86","86","86","86","87","87"  ],
  ["Magikoopa(R)","8034fee0","40","51","29","57","43","41","49","34","33","88","71","91","81","36","95","31","84","37","39","90","79","61","61","61","54","54","54","87","25","36","36","36","36","50","50","50","50","44","38","35","65","67","81","79","84","84","84","84","86","86","86","86","87","87"  ],
  ["Magikoopa(G)","8034ff80","40","51","29","57","43","41","49","34","33","88","71","91","81","36","95","31","84","37","39","90","79","61","61","61","54","54","54","87","25","36","36","36","36","50","50","50","50","44","38","35","65","67","81","79","84","84","84","84","86","86","86","86","87","87"  ],
  ["Magikoopa(Y)","80350020","40","51","29","57","43","41","49","34","33","88","71","91","81","36","95","31","84","37","39","90","79","61","61","61","54","54","54","87","25","36","36","36","36","50","50","50","50","44","38","35","65","67","81","79","84","84","84","84","86","86","86","86","87","87"  ],
  ["King Boo","803500c0","49","11","81","48","41","40","66","21","10","75","82","80","69","37","98","32","65","79","47","58","73","54","54","54","38","38","38","76","39","37","37","37","37","44","44","44","44","50","95","42","71","70","69","73","65","65","65","65","77","77","77","77","76","76"  ],
  ["Petey","80350160","35","34","91","52","5","6","42","24","23","66","63","51","44","31","64","30","33","92","37","68","43","15","15","15","10","10","10","81","28","31","31","31","31","38","38","38","38","95","50","56","74","73","44","43","33","33","33","33","41","41","41","41","81","81"  ],
  ["Dixie","80350200","55","57","90","95","70","72","60","71","73","33","21","24","63","64","51","62","67","89","74","66","59","44","44","44","75","75","75","54","61","64","64","64","64","35","35","35","35","42","56","50","77","88","63","59","67","67","67","67","37","37","37","37","54","54"  ],
  ["Goomba","803502a0","42","40","80","91","44","46","67","45","47","73","62","61","88","66","82","64","52","54","95","55","85","38","38","38","70","70","70","78","60","66","66","66","66","65","65","65","65","71","74","77","50","97","88","85","52","52","52","52","63","63","63","63","78","78"  ],
  ["Paragoomba","80350340","43","41","79","80","40","47","68","42","44","72","61","63","86","60","87","59","54","55","90","51","91","36","36","36","69","69","69","77","58","60","60","60","60","67","67","67","67","70","73","88","97","50","86","91","54","54","54","54","62","62","62","62","77","77"  ],
  ["Koopa(G)","803503e0","65","62","67","75","60","57","78","66","64","91","58","55","50","39","84","36","70","68","80","87","99","53","53","53","71","71","71","85","31","39","39","39","39","81","81","81","81","69","44","63","88","86","50","99","70","70","70","70","90","90","90","90","85","85"  ],
  ["Paratroopa(G)","80350480","62","65","72","70","57","60","74","61","77","90","55","58","99","38","89","35","75","64","82","80","50","50","50","50","68","68","68","83","30","38","38","38","38","79","79","79","79","73","43","59","85","91","99","50","75","75","75","75","88","88","88","88","83","83"  ],
  ["Shy Guy(B)","80350520","48","47","50","66","58","55","45","10","15","85","80","78","70","53","86","51","50","90","91","83","75","60","60","60","62","62","62","72","46","53","53","53","53","84","84","84","84","65","33","67","52","54","70","75","50","50","50","50","68","68","68","68","72","72"  ],
  ["Shy Guy(Y)","803505c0","48","47","50","66","58","55","45","10","15","85","80","78","70","53","86","51","50","90","91","83","75","60","60","60","62","62","62","72","46","53","53","53","53","84","84","84","84","65","33","67","52","54","70","75","50","50","50","50","68","68","68","68","72","72"  ],
  ["Shy Guy(G)","80350660","48","47","50","66","58","55","45","10","15","85","80","78","70","53","86","51","50","90","91","83","75","60","60","60","62","62","62","72","46","53","53","53","53","84","84","84","84","65","33","67","52","54","70","75","50","50","50","50","68","68","68","68","72","72"  ],
  ["Shy Guy(Bk)","80350700","48","47","50","66","58","55","45","10","15","85","80","78","70","53","86","51","50","90","91","83","75","60","60","60","62","62","62","72","46","53","53","53","53","84","84","84","84","65","33","67","52","54","70","75","50","50","50","50","68","68","68","68","72","72"  ],
  ["Dry Bones(Gy)","803507a0","32","28","43","44","35","30","46","33","34","92","42","48","90","29","85","27","68","56","81","84","88","58","58","58","55","55","55","82","38","29","29","29","29","86","86","86","86","77","41","37","63","62","90","88","68","68","68","68","50","50","50","50","82","82"  ],
  ["Dry Bones(G)","80350840","32","28","43","44","35","30","46","33","34","92","42","48","90","29","85","27","68","56","81","84","88","58","58","58","55","55","55","82","38","29","29","29","29","86","86","86","86","77","41","37","63","62","90","88","68","68","68","68","50","50","50","50","82","82"  ],
  ["Dry Bones(R)","803508e0","32","28","43","44","35","30","46","33","34","92","42","48","90","29","85","27","68","56","81","84","88","58","58","58","55","55","55","82","38","29","29","29","29","86","86","86","86","77","41","37","63","62","90","88","68","68","68","68","50","50","50","50","82","82"  ],
  ["Dry Bones(B)","80350980","32","28","43","44","35","30","46","33","34","92","42","48","90","29","85","27","68","56","81","84","88","58","58","58","55","55","55","82","38","29","29","29","29","86","86","86","86","77","41","37","63","62","90","88","68","68","68","68","50","50","50","50","82","82"  ],
  ["Bro(F)","80350a20","38","39","75","58","32","33","40","28","27","95","84","86","85","35","71","34","72","73","25","91","83","69","69","69","42","42","42","50","36","35","35","35","35","87","87","87","87","76","81","54","78","77","85","83","72","72","72","72","82","82","82","82","50","50"  ],
  ["Bro(B)","80350ac0","38","39","75","58","32","33","40","28","27","95","84","86","85","35","71","34","72","73","25","91","83","69","69","69","42","42","42","50","36","35","35","35","35","87","87","87","87","76","81","54","78","77","85","83","72","72","72","72","82","82","82","82","50","50"  ]
]

export const chemRead = readable(chemData)
export const chemWrite = writable(structuredClone(chemData))