import actionCreater from '../redux/actionCreators';

function showToast( message, type ){
  const d={display: true, message, severity: type};
  _SB.store.dispatch(
    actionCreater.setState(
      'snackbar',d
    )
  );
}

export default {
  error: (d) => showToast( d, 'error'),
  warning: (d) => showToast( d, 'warning'),
  info: (d) => showToast( d, 'info'),
  success: (d) => showToast( d, 'success'),
};
