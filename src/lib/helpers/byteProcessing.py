bString = "00 0a 14 1e 28 14 14 14 14 14 0a 19 1e 19 0a 14 14 14 14 14 28 1e 14 0a 00 00 0a 14 1e 28 14 14 14 14 14 0a 19 1e 19 0a 14 14 14 14 14 28 1e 14 0a 00 0a 00 14 1e 28 14 16 16 1c 08 14 19 19 19 05 14 16 16 1c 08 0a 00 14 1e 28 0a 00 14 1e 28 14 16 16 1c 08 14 19 19 19 05 14 16 16 1c 08 0a 00 14 1e 28 00 0a 14 1e 28 05 05 0f 28 23 05 05 14 28 23 05 05 0f 28 23 28 1e 14 0a 00 00 0a 14 1e 28 05 05 0f 28 23 05 05 14 28 23 05 05 0f 28 23 28 1e 14 0a 00 05 00 0a 28 2d 05 15 0c 1d 21 05 17 0f 1b 1e 05 15 0c 1d 21 05 00 0a 28 2d 05 00 0a 28 2d 05 15 0c 1d 21 05 17 0f 1b 1e 05 15 0c 1d 21 05 00 0a 28 2d 0a 14 14 14 1e 23 28 0f 05 05 1e 28 14 05 05 23 28 0f 05 05 28 1e 14 05 05 0a 14 14 14 1e 23 28 0f 05 05 1e 28 14 05 05 23 28 0f 05 05 28 1e 14 05 05 0a 00 14 1e 28 23 1e 16 0a 03 1e 1e 19 0f 00 23 1e 16 0a 03 0a 00 14 1e 28 0a 00 14 1e 28 23 1e 16 0a 03 1e 1e 19 0f 00 23 1e 16 0a 03 0a 00 14 1e 28"
bString = bString.replace(" ", "")
print(bString)
n=2
bList = [bString[i:i+n] for i in range(0, len(bString), n)]
bList = [int(bList[i], 16) for i in range(0, len(bList))]

print(len(bList))

iLength = 3
jLength = 2
kLength = 2
lLength = 5
mLength = 5

# 4 dimensions
#finalList = [[[[bList[l + k*lLength + j*lLength*kLength + i*lLength*kLength*jLength] for l in range(0, lLength)] for k in range(0,kLength)] for j in range(0,jLength)] for i in range(0, iLength)]

#5 dimensions
finalList = [[[[[bList[m + l*mLength + k*mLength*lLength + j*mLength*lLength*kLength + i*mLength*lLength*kLength*jLength] for m in range(0, mLength)] for l in range(0, lLength)] for k in range(0,kLength)] for j in range(0,jLength)] for i in range(0, iLength)]


print(finalList)
