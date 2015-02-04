Live life on the edge and DON'T README

Creating Raspberry PI Images
----------------------------
Nothing is more annoying than having to setup a Raspberry PI from the beginning. I have came up with a very simple strategy for saving/sharing our RPI images here at M&B (I have a much more elaborate version to pitch later but lets keep things simple for now). This method was derived for my love of Docker and how things are so easy to do with it however Docker is not currently supported on RPI without some heavy hacking that can thrash the stability of the little guy. 

Main ideas:
*Use DD to create raw .img files once you have a stable configuration that you plan to use or don't want to lose (remember if you don't use it you lose it)
*Create new images should be thought of alot like Git branch or Docker commit. You start with an existing image, add what you want, and then save (DD) another image which you commit/save back to S3 for others to use and expand on.
*Labeling will be the primitive part for now but we can discuss and get more complex as we go. Labeling should be of the format {YOURUNIQUETAG}_{INHERITEDFROMEXISTINGimgTAG}.zip with the exception of the base image which is named MNB_Base.zip. If I create a new image from that and called it Jeremy the final img name would be Jeremy_MNB.zip. This helps everyone be able to understand what the inheritence structure of the images is and understand what each image contains. How on earth can I do that you ask? You might have noticed that the filenames ended in .zip instead of .img this is because each file you upload to S3 MUST contain an INFO.txt file with this format.

OS: Raspbian
Parent_IMG: None
Author: Jeremy Dyer
Purpose: The prevent having to setup the network on a raspberry pi each time you want to start a new project. This image is the base Raspbian image with the M&B wireless credentials enabled on the image. You should be able to install this image fresh and locate the RPI device on the local network using common linux commands without having to plug the RPI into a monitor and set that initial stuff like that up. NOTE: the hostname is not set on this image to prevent RPIs from having the same hostname on the network.
ExtraInstalledPackagesFromParentImg: NONE - you might have something here like NodeJS V-0.10.36 for example

https://s3.amazonaws.com/makeandbuild/rpi/imgs