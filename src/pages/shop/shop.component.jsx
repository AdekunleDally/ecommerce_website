import React from 'react';
import {Route} from 'react-router-dom';
 import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import {connect} from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import CollectionPage from '../collection/collection.component';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner=WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
  constructor(){
    super();

    this.state={
      loading: true
    }
  }
  unsubscribeFromSnapshot = null;

  componentDidMount(){
    const {updateCollections} =this.props;
    const collectionRef= firestore.collection('collections');

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot=> {
      const collectionsMap=convertCollectionsSnapshotToMap(snapshot);
     //console.log("THE COLLECTION MAP IS :",collectionsMap)

     updateCollections(collectionsMap);
     this.setState({loading:false})
    })

  }
  render(){
     const {match} = this.props;
     const {loading} =this.state;
    return(        
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props)=> <CollectionsOverviewWithSpinner isLoading={loading} {...props}/> } />
        <Route exact path={`${match.path}/:collectionId`} render={(props)=> <CollectionPageWithSpinner isLoading={loading} {...props}/> }  /> 
      </div>
)
  }
}

 
const mapDispatchToProps=dispatch=>({
  updateCollections: collectionsMap =>dispatch(updateCollections(collectionsMap))
})
export default connect(null, mapDispatchToProps)(ShopPage);