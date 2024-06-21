// const path = require('path')
import fs from 'fs'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const csv2db = async()=>{
  let start = performance.now();

  let rawLines = fs.readFileSync('./csv/food/food.csv', 'utf-8');
  let linesArray = rawLines.split("\n");
  for (let index = 0; index <linesArray.length; index++) {
    try {
      if( index > 0 ) {
          let line = linesArray[index];
          let row = line.split(',"');
          const newData = await prisma.food.create({
            data: {
              Category: row[0].replaceAll(/"/g, ''),
              Description: row[1].replaceAll(/"/g, ''),
              Nutrient_Data_Bank_Number: Number(row[2].replaceAll(/"/g, '')),
              Alpha_Carotene: parseFloat(row[3].replaceAll(/"/g, '')),
              Beta_Carotene: parseFloat(row[4].replaceAll(/"/g, '')),
              Beta_Cryptoxanthin: parseFloat(row[5].replaceAll(/"/g, '')),
              Carbohydrate: parseFloat(row[6].replaceAll(/"/g, '')),
              Cholesterol: parseFloat(row[7].replaceAll(/"/g, '')),
              Choline: parseFloat(row[8].replaceAll(/"/g, '')),
              Fiber: parseFloat(row[9].replaceAll(/"/g, '')),
              Lutein_and_Zeaxanthin: parseFloat(row[10].replaceAll(/"/g, '')),
              Lycopene: parseFloat(row[11].replaceAll(/"/g, '')),
              Niacin: parseFloat(row[12].replaceAll(/"/g, '')),
              Protein: parseFloat(row[13].replaceAll(/"/g, '')),
              Retinol: parseFloat(row[14].replaceAll(/"/g, '')),
              Riboflavin: parseFloat(row[15].replaceAll(/"/g, '')),
              Selenium: parseFloat(row[16].replaceAll(/"/g, '')),
              Sugar_Total: parseFloat(row[17].replaceAll(/"/g, '')),
              Thiamin: parseFloat(row[18].replaceAll(/"/g, '')),
              Water: parseFloat(row[19].replaceAll(/"/g, '')),
              Fat_Monosaturated_Fat: parseFloat(row[20].replaceAll(/"/g, '')),
              Fat_Polysaturated_Fat: parseFloat(row[21].replaceAll(/"/g, '')),
              Fat_Saturated_Fat: parseFloat(row[22].replaceAll(/"/g, '')),
              Fat_Total_Lipid: parseFloat(row[23].replaceAll(/"/g, '')),
              Major_Minerals_Calcium: parseFloat(row[24].replaceAll(/"/g, '')),
              Major_Minerals_Copper: parseFloat(row[25].replaceAll(/"/g, '')),
              Major_Minerals_Iron: parseFloat(row[26].replaceAll(/"/g, '')),
              Major_Minerals_Magnesium: parseFloat(row[27].replaceAll(/"/g, '')),
              Major_Minerals_Phosphorus: parseFloat(row[28].replaceAll(/"/g, '')),
              Major_Minerals_Potassium: parseFloat(row[29].replaceAll(/"/g, '')),
              Major_Minerals_Sodium: parseFloat(row[30].replaceAll(/"/g, '')),
              Major_Minerals_Zinc: parseFloat(row[31].replaceAll(/"/g, '')),
              Vitamins_Vitamin_A_RAE: parseFloat(row[32].replaceAll(/"/g, '')),
              Vitamins_Vitamin_B12: parseFloat(row[33].replaceAll(/"/g, '')),
              Vitamins_Vitamin_B6: parseFloat(row[34].replaceAll(/"/g, '')),
              Vitamins_Vitamin_C: parseFloat(row[35].replaceAll(/"/g, '')),
              Vitamins_Vitamin_E: parseFloat(row[36].replaceAll(/"/g, '')),
              Vitamins_Vitamin_K: parseFloat(row[37].replaceAll(/"/g, '')),
            }
          })
          if(index%500 == 0){
            let timeTaken = performance.now() - start;
            console.log(`${index} rows added to db time: ${parseInt(timeTaken/1000)} second`);
          }
      }
    } catch (error) {
      console.log(error,'>>>>>', index);
    }
  }
}

const db2csv = async()=>{
  //Get All Fields Name from Prisma
  let allowedFields = Object.keys(prisma['food'].fields);
  allowedFields.shift();//remove id from array (first element)
  let columnNames = allowedFields.join(',');
  //Get All Data from DB
  const db_rows = await prisma.food.findMany({
  // where: { published: true },
  // include: { author: true },
  });
  let csv = '';
  csv += (columnNames + '\n')
  for (let item of db_rows) {
    let row = `"${item.Category}","${item.Description}","${item.Nutrient_Data_Bank_Number}","${item.Alpha_Carotene}","${item.Beta_Carotene}","${item.Beta_Cryptoxanthin}","${item.Carbohydrate}","${item.Cholesterol}","${item.Choline}","${item.Fiber}","${item.Lutein_and_Zeaxanthin}","${item.Lycopene}","${item.Niacin}","${item.Protein}","${item.Retinol}","${item.Riboflavin}","${item.Selenium}","${item.Sugar_Total}","${item.Thiamin}","${item.Water}","${item.Fat_Monosaturated_Fat}","${item.Fat_Polysaturated_Fat}","${item.Fat_Saturated_Fat}","${item.Fat_Total_Lipid}","${item.Major_Minerals_Calcium}","${item.Major_Minerals_Copper}","${item.Major_Minerals_Iron}","${item.Major_Minerals_Magnesium}","${item.Major_Minerals_Phosphorus}","${item.Major_Minerals_Potassium}","${item.Major_Minerals_Sodium}","${item.Major_Minerals_Zinc}","${item.Vitamins_Vitamin_A_RAE}","${item.Vitamins_Vitamin_B12}","${item.Vitamins_Vitamin_B6}","${item.Vitamins_Vitamin_C}","${item.Vitamins_Vitamin_E}","${item.Vitamins_Vitamin_K}"\n`;
    csv += row;
  }
  fs.writeFileSync('./food_rebuild.csv', csv);
  console.log('CSV file "food_rebuild.csv" created!');
}

csv2db();
// db2csv();