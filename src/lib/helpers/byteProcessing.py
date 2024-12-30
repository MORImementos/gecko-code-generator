bString = "00 64 00 82 ff 92 00 8c 00 91 ff 9c 00 91 00 96 ff 92 00 8c 00 91 ff 9c 00 64 00 82 ff 92 00 8c 00 96 ff 88 00 a2 00 b1 ff 60 00 a0 00 aa 00 00 00 a2 00 b1 ff 60 00 8c 00 96 ff 88"
bString = bString.replace(" ", "")
print(bString)
n=4 #byte length
bList = [bString[i:i+n] for i in range(0, len(bString), n)]
bList = [int(bList[i], 16) for i in range(0, len(bList))]

print(len(bList))

iLength = 2
jLength = 5
kLength = 3
lLength = 0
mLength = 0

# 3 dimensions
finalList = [[[bList[k + j*kLength + i*kLength*jLength] for k in range(0,kLength)] for j in range(0,jLength)] for i in range(0, iLength)]

# 4 dimensions
#finalList = [[[[bList[l + k*lLength + j*lLength*kLength + i*lLength*kLength*jLength] for l in range(0, lLength)] for k in range(0,kLength)] for j in range(0,jLength)] for i in range(0, iLength)]

#5 dimensions
#finalList = [[[[[bList[m + l*mLength + k*mLength*lLength + j*mLength*lLength*kLength + i*mLength*lLength*kLength*jLength] for m in range(0, mLength)] for l in range(0, lLength)] for k in range(0,kLength)] for j in range(0,jLength)] for i in range(0, iLength)]


print(finalList)
