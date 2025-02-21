import { SplitArrayIntoChunksUtil } from '@/@core/@shared/application/utils/split-array-into-chucks/split-array-into-chucks.util'

describe('SplitArrayIntoChuncksUtil unit tests', () => {
  it('should split array into chunks', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const chunkSize = 3
    const chunks = SplitArrayIntoChunksUtil.execute(array, chunkSize)
    expect(chunks).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  })
})
