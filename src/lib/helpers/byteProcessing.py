bString = "ff ce 00 32 00 32 00 64 00 64 01 2c 01 2c 01 90 01 90 01 f4 00 32 00 96 00 96 00 c8 00 c8 00 fa 00 fa 01 2c 01 2c 01 5e 00 32 00 96 00 96 00 c8 00 96 00 c8 00 c8 01 2c 01 2c 01 5e 00 32 00 96 00 96 00 c8 00 c8 00 fa 00 fa 01 2c 01 2c 01 5e ff ce 00 32 00 32 00 64 00 64 01 2c 01 2c 01 90 01 90 01 f4 01 90 01 c2 01 c2 01 f4 01 f4 02 26 02 26 02 58 02 26 02 58 00 32 00 64 00 64 00 96 01 2c 01 90 01 5e 01 c2 01 90 01 f4 00 64 00 c8 01 5e 01 90 01 c2 01 f4 01 f4 02 26 02 12 02 44 00 32 00 64 00 64 00 96 01 2c 01 90 01 5e 01 c2 01 90 01 f4 01 90 01 c2 01 c2 01 f4 01 f4 02 26 02 26 02 58 02 26 02 58"
bString = bString.replace(" ", "")
print(bString)
n=4
bList = [bString[i:i+n] for i in range(0, len(bString), n)]
bList = [int(bList[i], 16) for i in range(0, len(bList))]

print(len(bList))

iLength = 2
jLength = 5
kLength = 5
lLength = 2

finalList = [[[[bList[l + k*lLength + j*lLength*kLength + i*lLength*kLength*jLength] for l in range(0, lLength)] for k in range(0,kLength)] for j in range(0,jLength)] for i in range(0, iLength)]
print(finalList)
