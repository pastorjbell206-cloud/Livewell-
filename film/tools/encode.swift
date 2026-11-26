// Joins the rendered frames and the soundtrack into one MP4 (H.264 video, AAC sound) with Apple's own
// video writer, so no extra software is needed and the file plays on every phone and browser.
// Run: swift film/encode.swift <frames folder> <fps> <soundtrack.wav> <out.mp4> [bitrate in Mbps]
import AVFoundation
import CoreGraphics
import ImageIO
import Foundation

let args = CommandLine.arguments
guard args.count >= 5 else { print("usage: encode.swift frames fps soundtrack.wav out.mp4 [mbps]"); exit(1) }
let framesDir = URL(fileURLWithPath: args[1])
let fps = Int32(args[2])!
let audioURL = URL(fileURLWithPath: args[3])
let outURL = URL(fileURLWithPath: args[4])
let mbps = args.count > 5 ? Double(args[5])! : 6
try? FileManager.default.removeItem(at: outURL)

let files = try FileManager.default.contentsOfDirectory(atPath: framesDir.path).filter { $0.hasSuffix(".jpg") || $0.hasSuffix(".png") }.sorted()
guard let first = CGImageSourceCreateWithURL(framesDir.appendingPathComponent(files[0]) as CFURL, nil),
      let firstImg = CGImageSourceCreateImageAtIndex(first, 0, nil) else { print("cannot read frames"); exit(1) }
let W = firstImg.width, H = firstImg.height

let writer = try AVAssetWriter(outputURL: outURL, fileType: .mp4)
writer.shouldOptimizeForNetworkUse = true  // the site can start playing before the whole file arrives
let vIn = AVAssetWriterInput(mediaType: .video, outputSettings: [
  AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: W, AVVideoHeightKey: H,
  AVVideoCompressionPropertiesKey: [
    AVVideoAverageBitRateKey: Int(mbps * 1_000_000), AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    AVVideoExpectedSourceFrameRateKey: Int(fps), AVVideoMaxKeyFrameIntervalKey: Int(fps) * 2,
  ],
  AVVideoColorPropertiesKey: [AVVideoColorPrimariesKey: AVVideoColorPrimaries_ITU_R_709_2,
    AVVideoTransferFunctionKey: AVVideoTransferFunction_ITU_R_709_2, AVVideoYCbCrMatrixKey: AVVideoYCbCrMatrix_ITU_R_709_2],
])
vIn.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: vIn, sourcePixelBufferAttributes: [
  kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB, kCVPixelBufferWidthKey as String: W, kCVPixelBufferHeightKey as String: H,
])
writer.add(vIn)

let asset = AVURLAsset(url: audioURL)
let aTrack = asset.tracks(withMediaType: .audio).first!
let reader = try AVAssetReader(asset: asset)
let aOut = AVAssetReaderTrackOutput(track: aTrack, outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM])
reader.add(aOut)
let aIn = AVAssetWriterInput(mediaType: .audio, outputSettings: [
  AVFormatIDKey: kAudioFormatMPEG4AAC, AVSampleRateKey: 48000, AVNumberOfChannelsKey: 2, AVEncoderBitRateKey: 192_000,
])
aIn.expectsMediaDataInRealTime = false
writer.add(aIn)

writer.startWriting(); reader.startReading()
writer.startSession(atSourceTime: .zero)

let space = CGColorSpace(name: CGColorSpace.sRGB)!
func pixelBuffer(_ img: CGImage) -> CVPixelBuffer {
  var pb: CVPixelBuffer?
  CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &pb)
  let b = pb!
  CVPixelBufferLockBaseAddress(b, [])
  let ctx = CGContext(data: CVPixelBufferGetBaseAddress(b), width: W, height: H, bitsPerComponent: 8,
                      bytesPerRow: CVPixelBufferGetBytesPerRow(b), space: space, bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)!
  ctx.draw(img, in: CGRect(x: 0, y: 0, width: W, height: H))
  CVPixelBufferUnlockBaseAddress(b, [])
  return b
}

var vi = 0, audioDone = false, videoDone = false
while !(audioDone && videoDone) {
  var did = false
  if !videoDone && vIn.isReadyForMoreMediaData {
    if vi < files.count {
      autoreleasepool {
        let src = CGImageSourceCreateWithURL(framesDir.appendingPathComponent(files[vi]) as CFURL, nil)!
        let img = CGImageSourceCreateImageAtIndex(src, 0, nil)!
        adaptor.append(pixelBuffer(img), withPresentationTime: CMTime(value: CMTimeValue(vi), timescale: fps))
      }
      vi += 1; did = true
    } else { vIn.markAsFinished(); videoDone = true }
  }
  if !audioDone && aIn.isReadyForMoreMediaData {
    if let s = aOut.copyNextSampleBuffer() { aIn.append(s); did = true } else { aIn.markAsFinished(); audioDone = true }
  }
  if !did { usleep(1000) }
}
let sem = DispatchSemaphore(value: 0)
writer.finishWriting { sem.signal() }
sem.wait()
if writer.status != .completed { print("failed:", writer.error as Any); exit(1) }
let size = (try FileManager.default.attributesOfItem(atPath: outURL.path)[.size] as! NSNumber).intValue
print("saved \(outURL.path): \(W)x\(H), \(files.count) frames at \(fps) fps, \(size / 1024) KB")
