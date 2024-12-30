bString = "00 00 00 00 00 00 00 00 fd 44 fe 0c fe 0c fe a2 fe 70 ff 06 fe a2 ff 9c ff 6a 00 fa 00 c8 01 2c 00 fa 01 90 01 5e 02 26 02 26 02 bc 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 fd a8 fe 70 fe 70 ff 38 fe d4 ff 9c ff 38 00 c8 00 64 01 90 01 2c 01 c2 01 5e 02 58 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 fd 12 fe 0c fe 0c fe d4 fe d4 ff 6a ff 6a 00 c8 00 c8 01 90 01 2c 01 c2 01 90 02 58 01 f4 02 58 02 58 02 bc 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 fd a8 fe 70 fe 70 ff 38 fe d4 00 64 00 64 01 90 00 64 01 90 00 c8 01 f4 01 f4 02 bc 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 fd 44 fd a8 fd a8 fe 70 fe 3e fe a2 fe 70 fe d4 fe a2 ff 38 ff 38 00 96 00 96 01 2c 01 2c 02 bc 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 fd da fe d4 fe 70 ff 38 fe d4 ff 9c fe d4 ff 9c ff 9c 00 c8 00 c8 01 c2 01 c2 02 8a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
bString = bString.replace(" ", "")
print(bString)
n=4
bList = [bString[i:i+n] for i in range(0, len(bString), n)]
bList = [int(bList[i], 16) for i in range(0, len(bList))]

print(len(bList))

iLength = 3
jLength = 2
kLength = 15
lLength = 2
mLength = 0

# 4 dimensions
finalList = [[[[bList[l + k*lLength + j*lLength*kLength + i*lLength*kLength*jLength] for l in range(0, lLength)] for k in range(0,kLength)] for j in range(0,jLength)] for i in range(0, iLength)]

#5 dimensions
#finalList = [[[[[bList[m + l*mLength + k*mLength*lLength + j*mLength*lLength*kLength + i*mLength*lLength*kLength*jLength] for m in range(0, mLength)] for l in range(0, lLength)] for k in range(0,kLength)] for j in range(0,jLength)] for i in range(0, iLength)]


print(finalList)
