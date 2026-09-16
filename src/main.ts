import { type DataInput, type CountPerPos } from "./types";

function parseFile(rawText: string): DataInput[] {
  const text = rawText.trim();
  let rawLines = text.split("\n"); //lines array
  let header = rawLines[0].split("\t"); //header
  let geneIndex: number = header.indexOf("Hugo_Symbol");
  let proteinPosIndex: number = header.indexOf("Protein_position");
  let patientIndex: number = header.indexOf("Tumor_Sample_Barcode");
  const parsedData: (DataInput | null)[] = rawLines.slice(1).map(line => {
    const value = line.split("\t");
    const data: DataInput = {
      gene: value[geneIndex],
      proteinPosition: Number(value[proteinPosIndex]),
      patient: value[patientIndex]
    };
    if (data.proteinPosition == 0) {
      return null;
    }
    return data;
  });
  return parsedData.filter(x => x !== null );
};

function dataAggregation(data: DataInput[]): CountPerPos[] {
  const counter = new Map<number, number>();
  data.forEach(elt => {
    if (counter.has(elt.proteinPosition)) {
      let value = counter.get(elt.proteinPosition)!;
      counter.set(elt.proteinPosition, value += 1);
    } else {
      counter.set(elt.proteinPosition, 1);
    }
  })
  return [...counter].map(([protPos, count]) =>({ protPos, count }));
}

const testText = "Hugo_Symbol\tProtein_position\tTumor_Sample_Barcode\nTP53\t248\tTCGA-CS-4938-01\nIDH1\t132\tTCGA-CS-4938-01\nTP53\t275\tTCGA-CS-4942-01\nIDH1\t132\tTCGA-CS-4942-01\nIDH1\t132\tTCGA-CS-4943-01\nIDH1\t132\tTCGA-CS-4944-01\nIDH1\t132\tTCGA-CS-5390-01";
const parsed = parseFile(testText);

console.log(dataAggregation(parsed));
