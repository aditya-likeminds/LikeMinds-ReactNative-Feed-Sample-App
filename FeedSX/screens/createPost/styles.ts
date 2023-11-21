import {StyleSheet} from 'react-native';
import layout from '../../constants/Layout';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: layout.window.height,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 12,
  },
  userNameText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222020',
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  textInputView: {
    marginHorizontal: 15,
    marginVertical: 8,
    fontSize: 16,
    elevation: 0,
    maxHeight: 220,
  },
  addMoreButtonView: {
    width: '35%',
    borderColor: '#5046E5',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: 8,
    marginVertical: 20,
  },
  selectionOptionsView: {
    position: 'absolute',
    bottom: 0,
    width: layout.window.width,
    backgroundColor: '#fff',
    height: 122,
  },
  optionItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#D0D8E280',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  addMoreButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5046E5',
    marginLeft: 5,
  },
  selectionOptionstext: {
    marginLeft: 8,
    color: '#222020',
  },
});
