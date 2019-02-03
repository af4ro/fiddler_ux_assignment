import csv
from collections import defaultdict
class Plotter:
    def __init__(self, limit, file_name):
        self.col_names = []
        self.data = defaultdict(list)
        self.file_name = file_name
        self.limit = limit

    def set_data(self):
        with open(self.file_name, newline='') as csvfile:
            file = csv.reader(csvfile)
            first = True
            limit = 0
            for row in file:
                if limit > self.limit:
                    break
                if first:
                    first = False
                    self.col_names = row
                else:
                    for i in range(len(row)):
                        self.data[self.col_names[i]].append(row[i])
                limit += 1

if __name__ == "__main__":
    plot = Plotter(1, "test.csv")
    plot.set_data()
    print(plot.data)
