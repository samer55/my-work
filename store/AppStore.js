import { observable, autorun } from 'mobx'
import { AsyncStorage } from 'react-native';

class AppStore {
  constructor() {
   isAuthenticating = true
   AsyncStorage.getItem('region').then((value) => {
     let parsed = JSON.parse(value);

   this.Myregion =parsed
   });
   AsyncStorage.getItem('address').then((value) => {
   this.address =value
   });
   AsyncStorage.getItem('curr').then((value) => {
   this.currency =value?value:'JD'
   });

    AsyncStorage.getItem('lang', (err, value) => {
        if (err) {
            console.log(err)
        } else {
               this.arabic =  JSON.parse(value) // boolean false
        }
    })
 }
  @observable username = ''
  @observable name = ''

   @observable user = {}
   @observable post_count = 0
   @observable Requests_count = 0
   @observable Saved_count = 0
   @observable name = ''
   @observable email = ''
   @observable Admin = false
   @observable currentopened = []
   @observable Myregion = []

   @observable order_count = 0
   @observable chat_count = 0
   @observable new_messages = 0
   @observable currency = 'JD'
   @observable current_puid = ''
@observable address = ''
@observable profileimg = ''
@observable counter = 0;
  increment() { this.counter++;
  console.log("increment", this.counter); }
@observable isTeacher = false
change() { this.arabic =true }
@observable arabic = true
@observable map = null
}

const appStore = new AppStore()

/*
autorun(() => {
  console.log(appStore)
})
*/

export default appStore
