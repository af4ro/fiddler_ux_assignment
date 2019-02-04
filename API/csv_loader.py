import csv
from collections import defaultdict


class CsvLoader:
    def __init__(self):
        self.data = defaultdict(list)

    def read_data_from_csv(self, filename, limit):
        col_names = []
        self.data = defaultdict(list)
        with open(filename, newline='') as csv_file:
            file = csv.reader(csv_file)
            first = True
            counter = 0
            for row in file:
                if counter > limit:
                    break
                if first:
                    first = False
                    col_names = row
                else:
                    for i in range(len(row)):
                        self.data[col_names[i]].append(row[i])
                counter += 1

    def get_column_values(self, col_name):
        return self.data[col_name]


if __name__ == "__main__":
    plot = CsvLoader()
    plot.read_data_from_csv("test.csv", 1)
    print(plot.data)
