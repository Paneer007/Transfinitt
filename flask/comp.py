import numpy as np
from pdf2image import convert_from_path
import pytesseract



def get_json(fname, search_query, lang='eng', fullSet=False):
  
    images = convert_from_path(fname)

    readable_images_of_pdf = []  # Create a list for thr for loop to put the images into
    for PIL_Image in images:
        readable_images_of_pdf.append(np.array(PIL_Image.convert('L')))
    
    readable_images_of_pdf = np.array(readable_images_of_pdf)

    readable_images_of_pdf = readable_images_of_pdf[2:]

    cards = []
    pyt = []
    idx = 0

    for k in range(readable_images_of_pdf.shape[0]):
        for i in range(10):
            for j in range(3):
                cards.append(crop_rectangle(readable_images_of_pdf[k], 69 + j*500, 115 + i*197, 500, 197))
                pyt.append(pytesseract.image_to_string(cards[idx]))
                idx += 1
    cards = np.array(cards)

    for i in range(len(pyt)):
        pyt[i] = pyt[i].replace('\n', ' ')
        pyt[i] = pyt[i].replace('\x0c', ' ')
        
    if lang == 'eng':
        output2 = ''

        person = []
        relationships = ['Husband', 'Father', 'Wife', 'husband', 'father', 'wife']
        for j in range(len(pyt)):
            output2 = pyt[j]
            output2 = output2.replace('Photo','')
            output2 = output2.replace('is','')
            output2 = output2.replace('Available','')
            output2 = output2.replace('"','')
            output2 = output2.replace("'",'')


            personObj= {"name":'',"relation-name":'',"house-number":'',"relationship":'',"age":'',"gender":'',"EPIC-ID":''}

            c="name"
            for i in range(len(output2)):
                if output2[i:i+4] == 'Name':
                    temp = output2[i+5:]
                    temp = temp.split(' ')
                    if(len(temp)>1):
                        if(temp[2]):
                            if("House" not in temp[2]):
                                personObj[c] = (temp[1] + " " + temp[2])
                                c="relation-name"
                            else:
                                personObj[c] = (temp[1])
                                c="relation-name"
                        else:
                            personObj[c] = (temp[1])
                            c="relation-name"
            

            for k in range(len(relationships)):
                if(relationships[k] in output2):
                    personObj["relationship"] = relationships[k]


            leng=len(search_query)
            for i in range(len(output2)):
                if output2[i+3:i+leng].isdigit():
                    personObj["EPIC-ID"] = output2[i:i+leng]


            for i in range(len(output2)):
                if output2[i:i+6] == "Number":
                    temp = output2[i+7:]
                    temp = temp.split(' ')
                    if(len(temp)>1):
                        personObj["house-number"] = (temp[1])

            for i in range(len(output2)):
                if output2[i:i+3] == 'Age':
                    temp = output2[i+4:]
                    temp = temp.split(' ')
                    if(len(temp)>1):
                        personObj["age"] = (temp[1])

            for i in range(len(output2)):
                if output2[i:i+6] == 'Gender':
                    temp = output2[i+7:]
                    temp = temp.split(' ')
                    if(len(temp)>1):
                        personObj["gender"] = (temp[1])
            person.append(personObj)

        if(fullSet):
            return(person)

        print(len(person))
        reqHouseNum = []
        reqPeople = []
        output = []
        for i in range(len(person)):
            if person[i]["EPIC-ID"] == search_query:
                #the condition when the epic id matches
                if('house-number'!='-' and 'house-number'!='-'):
                    reqHouseNum.append(person[i]['house-number'])
                reqPeople.append(person[i]['name'])
                reqPeople.append(person[i]['relation-name'])
                output.append(person[i])
        print( len(reqHouseNum))
        print( len(reqPeople))
        
 
        for i in range(5):
            for i in range(len(person)):
                for j in range(len(reqHouseNum)):

                    if reqHouseNum[j] == person[i]['house-number']:
                        if person[i]['name'] not in reqPeople:
                            reqPeople.append(person[i]['name'])
                            if person[i] not in output:
                                output.append(person[i])
                        if person[i]['relation-name'] not in reqPeople:
                            reqPeople.append(person[i]['name'])
                            if person[i] not in output:
                                output.append(person[i])

                    if reqPeople[j] in person[i]['name']:
                        if person[i]['house-number'] not in reqHouseNum:
                            if(person[i]['house-number']!='-' and person[i]['house-number']!='-'):
                                reqHouseNum.append(person[i]['house-number'])
                        if person[i] not in output:
                            output.append(person[i])
                            
                    if reqPeople[j] in person[i]['relation-name']:
                        if person[i]['house-number'] not in reqHouseNum:
                            if(person[i]['house-number']!='-' and person[i]['house-number']!='-'):
                                reqHouseNum.append(person[i]['house-number'])
                        if person[i] not in output:
                            output.append(person[i])

        # arr = []
        # for i in range(len(output)):
        #     a=output[i]
        #     b = []
        #     b.append(a['name'])
        #     b.append(a['relation-name'])
        #     b.append(a['relationship'])
        #     b.append(a['age'])
        #     b.append(a['gender'])
        #     arr.append(b)

        # return arr
        return output
                
    else:
        if lang == "kan":
            for i in search_query:
                if i == 'O':
                    search_query = search_query.replace(i, '0')

                if i =="I":
                    search_query = search_query.replace(i, '1')

        
        for i in range(len(pyt)):
            if search_query in pyt[i]:            
                word = ""
                count = 0
                #iterate over the string and wait for 3 colons to appear and then start appending the string to word until the a space is found
                for j in range(len(pyt[i])):
                    if count == 3:
                        new_str = pyt[i][j:]
                        new_str = new_str.lstrip().split(" ")[0]
                        word += new_str
                        break
                    if lang == 'eng':
                        if pyt[i][j] == ":" or pyt[i][j] == "=" or pyt[i][j] == "-":
                            count += 1
                    elif lang == 'kan':
                        if pyt[i][j] == ":" or pyt[i][j] == "-":
                            count += 1
                    else:
                        if pyt[i][j] == ":" :
                            count += 1


        house_number_list = []
        for i in range(len(pyt)):
            word_1 = ""
            count = 0
            #iterate over the string and wait for 3 colons to appear and then start appending the string to word until the a space is found
            for j in range(len(pyt[i])):
                if count == 3:
                    new_str = pyt[i][j:]
                    new_str = new_str.lstrip().split(" ")[0]
                    word_1 += new_str
                    break
                if lang == 'eng':
                    if pyt[i][j] == ":" or pyt[i][j] == "=" or pyt[i][j] == "-":
                        count += 1
                elif lang == 'kan':
                    if pyt[i][j] == ":" or pyt[i][j] == "-" or pyt[i][j] == ".":
                        count += 1
                else:
                    if pyt[i][j] == ":" :
                        count += 1
            house_number_list.append(word_1)

        print(house_number_list)

        indexes = [i for i, x in enumerate(house_number_list) if x == word]

        print(indexes)

        family_cards = []
        for i in indexes:
            family_cards.append(cards[i])

        family_cards = np.array(family_cards)

        texf = []

        for i in range(len(family_cards)):

            len_ = len(search_query)

            test = family_cards[i]

            test = crop_rectangle(test, 350, 0, 500, 100)

            text = pytesseract.image_to_string(test)

            text = text.replace('\n', ' ')
            text = text.replace('\x0c', ' ')

            l = text.split(" ")
            

            for j in l:
                if len(j) == len_:
                    texf.append(j)

        return texf

def crop_rectangle(img, x, y, w, h):
    image = img[y:y+h, x:x+w]
    return image


#pyt_temp = get_json("./goa.pdf", "WWE0239533", "eng", True)

