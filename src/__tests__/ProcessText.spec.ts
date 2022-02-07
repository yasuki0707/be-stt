import { TSearchedText } from '@/types/SearchedText';
import { processText } from '@/modules/ProcessText';

describe('Text provided should be processed correctly.', (): void => {
  describe('1 keyWord is specified', (): void => {
    test('1 time found', (): void => {
      const text = 'これはテストです。';
      const keyWords = ['テスト'];
      const expected = [
        {
          keyWord: 'テスト',
          pos: 4,
          redundantKeyWord: 'これはテストです。'
        }
      ];
      const result = processText(text, keyWords);
      expect(result).toStrictEqual(expected);
    });
    test('multiple times found', (): void => {
      const text = 'これは1回目テストです。あれは2回目テストです。';
      const keyWords = ['テスト'];
      const expected = [
        {
          keyWord: 'テスト',
          pos: 7,
          redundantKeyWord: 'れは1回目テストです。あれ'
        },
        {
          keyWord: 'テスト',
          pos: 19,
          redundantKeyWord: 'れは2回目テストです。'
        }
      ];
      const result = processText(text, keyWords);
      expect(result).toStrictEqual(expected);
    });
    test('not found', (): void => {
      const text = 'これはTESTです。';
      const keyWords = ['テスト'];
      const expected: TSearchedText[] = [];
      const result = processText(text, keyWords);
      expect(result).toStrictEqual(expected);
    });
  });
  describe('multiple keyWords are specified', (): void => {
    test('All keyWords found 1 time', (): void => {
      const text = 'これはテストです。This is TEST.';
      const keyWords = ['テスト', 'TEST'];
      const expected = [
        {
          keyWord: 'テスト',
          pos: 4,
          redundantKeyWord: 'これはテストです。Th'
        },
        {
          keyWord: 'TEST',
          pos: 18,
          redundantKeyWord: 's is TEST.'
        }
      ];
      const result = processText(text, keyWords);
      expect(result).toStrictEqual(expected);
    });
    test('1 keyWords found 1 time, others found multiple times', (): void => {
      const text = 'これはテストです。This is TEST.そしてあれもテストです。テストがいっぱいですね。';
      const keyWords = ['テスト', 'TEST'];
      const expected = [
        {
          keyWord: 'テスト',
          pos: 4,
          redundantKeyWord: 'これはテストです。Th'
        },
        {
          keyWord: 'テスト',
          pos: 29,
          redundantKeyWord: 'してあれもテストです。テス'
        },
        {
          keyWord: 'テスト',
          pos: 35,
          redundantKeyWord: 'ストです。テストがいっぱい'
        },
        {
          keyWord: 'TEST',
          pos: 18,
          redundantKeyWord: 's is TEST.そしてあ'
        }
      ];
      const result = processText(text, keyWords);
      expect(result).toStrictEqual(expected);
    });
    test('All keyWords found multiple times', (): void => {
      const text =
        'これはテストです。This is TEST.そしてあれもテストです。テストがいっぱいですね。Is this TEST? Yes, it is!';
      const keyWords = ['テスト', 'TEST'];
      const expected = [
        {
          keyWord: 'テスト',
          pos: 4,
          redundantKeyWord: 'これはテストです。Th'
        },
        {
          keyWord: 'テスト',
          pos: 29,
          redundantKeyWord: 'してあれもテストです。テス'
        },
        {
          keyWord: 'テスト',
          pos: 35,
          redundantKeyWord: 'ストです。テストがいっぱい'
        },
        {
          keyWord: 'TEST',
          pos: 18,
          redundantKeyWord: 's is TEST.そしてあ'
        },
        {
          keyWord: 'TEST',
          pos: 55,
          redundantKeyWord: 'this TEST? Yes'
        }
      ];
      const result = processText(text, keyWords);
      expect(result).toStrictEqual(expected);
    });
  });
  describe('special cases', (): void => {
    test('Text is just repetision of 1 keyWord.', (): void => {
      const text = 'テストテストテストテストテスト';
      const keyWords = ['テスト'];
      const expected = [
        {
          keyWord: 'テスト',
          pos: 1,
          redundantKeyWord: 'テストテストテス'
        },
        {
          keyWord: 'テスト',
          pos: 4,
          redundantKeyWord: 'テストテストテストテス'
        },
        {
          keyWord: 'テスト',
          pos: 7,
          redundantKeyWord: 'ストテストテストテストテス'
        },
        {
          keyWord: 'テスト',
          pos: 10,
          redundantKeyWord: 'ストテストテストテスト'
        },
        {
          keyWord: 'テスト',
          pos: 13,
          redundantKeyWord: 'ストテストテスト'
        }
      ];
      const result = processText(text, keyWords);
      expect(result).toStrictEqual(expected);
    });
    test('Text consists of 1 type character, which is keyWord.', (): void => {
      const text = 'ああああああ';
      const keyWords = ['あ'];
      const expected = [
        {
          keyWord: 'あ',
          pos: 1,
          redundantKeyWord: 'ああああああ'
        },
        {
          keyWord: 'あ',
          pos: 2,
          redundantKeyWord: 'ああああああ'
        },
        {
          keyWord: 'あ',
          pos: 3,
          redundantKeyWord: 'ああああああ'
        },
        {
          keyWord: 'あ',
          pos: 4,
          redundantKeyWord: 'ああああああ'
        },
        {
          keyWord: 'あ',
          pos: 5,
          redundantKeyWord: 'ああああああ'
        },
        {
          keyWord: 'あ',
          pos: 6,
          redundantKeyWord: 'ああああああ'
        }
      ];
      const result = processText(text, keyWords);
      expect(result).toStrictEqual(expected);
    });
    test('Text length is less than keyWord length.', (): void => {
      const text = 'これはテストです。';
      const keyWords = ['このキーワードでは見つかりそうにない'];
      const expected: TSearchedText[] = [];
      const result = processText(text, keyWords);
      expect(result).toStrictEqual(expected);
    });
  });
});
