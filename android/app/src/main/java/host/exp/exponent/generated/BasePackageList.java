package host.exp.exponent.generated;

import java.util.Arrays;
import java.util.List;
import org.unimodules.core.interfaces.Package;

public class BasePackageList {
  public List<Package> getPackageList() {
    return Arrays.<Package>asList(
        new expo.modules.appauth.AppAuthPackage(),
        new expo.modules.constants.ConstantsPackage(),
        new expo.modules.documentpicker.DocumentPickerPackage(),
        new expo.modules.errorrecovery.ErrorRecoveryPackage(),
        new expo.modules.facebook.FacebookPackage(),
        new expo.modules.filesystem.FileSystemPackage(),
        new expo.modules.font.FontLoaderPackage(),
        new expo.modules.medialibrary.MediaLibraryPackage(),
        new expo.modules.permissions.PermissionsPackage(),
        new expo.modules.imagepicker.ImagePickerPackage(),
        new expo.modules.keepawake.KeepAwakePackage(),
        new expo.modules.lineargradient.LinearGradientPackage(),
        new expo.modules.location.LocationPackage(),
        new expo.modules.screenorientation.ScreenOrientationPackage(),
        new expo.modules.sharing.SharingPackage(),
        new expo.modules.sqlite.SQLitePackage(),
        new expo.modules.webbrowser.WebBrowserPackage()
    );
  }
}
