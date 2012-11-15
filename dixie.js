// Copyright 2011 Google Inc. All Rights Reserved.
//
// This code is licensed under the same terms as WebM:
//  Software License Agreement:  http://www.webmproject.org/license/software/
//  Additional IP Rights Grant:  http://www.webmproject.org/license/additional/
// -----------------------------------------------------------------------------
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
// IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY 
// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, 
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// -----------------------------------------------------------------------------
//
// Author: John Koleszar (jkoleszar@google.com)
//         Dominik Homberger (dominik.homberger@gmail.com)

"use strict";



/* Definition of the argument values for the exit() function stdlib.h*/

//int strcmp ( const char * str1, const char * str2 );
function strcmp (str1, str2 ) {
	return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
}

var ptr = 0;

//stdio.h
/* Seek method constants */

var EXIT_SUCCESS   = 0;
var EXIT_FAILURE   = 1;

var SEEK_CUR    = 1;
var SEEK_END    = 2;
var SEEK_SET    = 0;

var buffer8k=function() {return Arr(8800,0)};
//fread
//size_t fread ( void * ptr, size_t size, size_t count, FILE * stream );
function fread ( ptr, size, count, stream ) {
	ptr.val=new buffer8k();//new Array();
	//todo: size include
	
	if(stream.data.length<count+stream.data_off) {stream.data_off += count; return 0; }
	for(var i=0;i<count;++i)
		ptr.val[i]=(stream.data[stream.data_off++]);
		ptr.val.length=count;
	return i;
}
//fseek

//ftell
//long int ftell ( FILE * stream );
function ftell(stream) {
	return stream.data_off;
}
//ferror
//int ferror ( FILE * stream );

//feof
function feof(stream) {
	if(stream.data.length<stream.data_off) return 1; return 0;
}

var char_=0, short_=0, int_=0, long_=0, void_=0;

var int8_t=char_;
var uint8_t=char_;
var int16_t=short_;
var uint16_t=short_;
var int32_t=int_;
var uint32_t=int_;
var uint64_t=long_;
var int64_t=long_;

var float_=0.00;
var size_t=0;
var double_=0;
var score_t=int64_t;
var CHAR_BIT      = 8;         /* number of bits in a char */

var ptrdiff_t=int_;

var UINT8=char_; var INT16=short_;
/*function convertBinaryToArray(binary) {
	var arr = new Array();
	if(binary.length<200000)
	var num=binary.length; else num=200000;
	for(i=0;i<num;++i)
	arr.push(binary.charCodeAt(i));
  return arr;
}*/

function newObjectIt(ObjIt) {
  return (typeof ObjIt==='undefined')?'error':JSON.parse(JSON.stringify(ObjIt));
}

function memcpy(dst, dst_off, src, src_off, num) {
	var i;
	for(i=0;i<num;++i)
		dst[dst_off + i] = src[src_off + i];
	return dst;
}

function memset(ptr, ptr_off, value, num) {
	var i=0;
		for(i=0; i<num; ++i) 
			ptr[ptr_off + i]=value;
}
//function memset_O(ptr, ptr_off, value, num) {
//	if(typeof ptr=='object')
//	for (var key in ptr) {
//		//if(typeof ptr[key]!='object') {
//			ptr[key]=value;
//		//}
//	}
//}

function malloc(size,value) {
  var i;
  var output = new Array(); for (i = 0; i < size; ++i) output.push(value);
  return output
  //return size
}

function assert(bCondition) {
	if (!bCondition) {
		throw new Error('assert :P');
	}
}

function setjmp(jmp) {
	//todo: return 1 um zur?ckzusetzen
	return 0;
}

function offsetof(val1,val2) {
	return val2;
}

//function sizeof(val) {
//	return 1;
//}

//function intBitLeft(uint_t, lefts) {
//	//same as (int64)uint64_t<<lefts
//	var zeros = new Array();
//	var i;
//	for(i=0;i<lefts;++i) 
//		zeros[i] ='0';
//	bits = ( uint_t.toString(2) +''+ zeros.join("") );
//	return parseInt(bits,2);
//}

function Arr(len,val) {
	var i;
	var result = new Array(); for (i = 0; i < len; ++i) result.push(val);
	return result;
}

function Arr_new(len,val) {
	var i;
	var result = new Array(); for (i = 0; i < len; ++i) result.push(new val);
	return result;
}

function Arr_nOI(len,val) {
	var i;
	var result = new Array(); for (i = 0; i < len; ++i) result.push(newObjectIt(val));
	return result;
}

function ArrM(AOfLen,val) {
	var a;
	var result, resStr=new Array();
	
	for (a = (AOfLen.length-1); a >= 0; --a)
		val = newObjectIt(Arr(AOfLen[a],val));
	return val;
}

///////////////////////////////
//if(!Object.keys) Object.keys = function(o){  
//// if (o !== Object(o))  
////	  throw new TypeError('Object.keys called on non-object');  
// var ret=[],p;  
// for(p in o) if(Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);  
// return ret;  
//}  
//
function create_obj_vals_from_arrayChilds(Obj,Arr) {
	var i;
	for(i=0;i<Arr.length;++i)
		Arr[i]=create_obj_vals_from_array(new Obj(),Arr[i]);
	return Arr;
}
function create_obj_vals_from_array(Obj,Arr) {
	var new_Obj = Obj;
	var i=0;
	for (var key in new_Obj) {
		if(typeof new_Obj[key]=='object' && (Object.keys(new_Obj[key]).length==Arr[i].length)) {
			new_Obj[key]=create_obj_vals_from_array(new_Obj[key],Arr[i]);
		} else
		{
			new_Obj[key]=Arr[i];
		}
		i++;
	}
	return new_Obj;
}


//dixie functions & ariables
//74
var
    DC_PRED=0,            /* average of above and left pixels */
    V_PRED=1,             /* vertical prediction */
    H_PRED=2,             /* horizontal prediction */
    TM_PRED=3,            /* Truemotion prediction */
    B_PRED=4,             /* block based prediction, each block has its own prediction mode */

    NEARESTMV=5,
    NEARMV=6,
    ZEROMV=7,
    NEWMV=8,
    SPLITMV=9,

    MB_MODE_COUNT=10
;// MB_PREDICTION_MODE;

//109
var
//{
    B_DC_PRED=0,          /* average of above and left pixels */
    B_TM_PRED=1,

    B_VE_PRED=2,           /* vertical prediction */
    B_HE_PRED=3,           /* horizontal prediction */

    B_LD_PRED=4,
    B_RD_PRED=5,

    B_VR_PRED=6,
    B_VL_PRED=7,
    B_HD_PRED=8,
    B_HU_PRED=9,

    LEFT4X4=10,
    ABOVE4X4=11,
    ZERO4X4=12,
    NEW4X4=13,

    B_MODE_COUNT=14
;//} B_PREDICTION_MODE;

function CODEC_INTERFACE(id,arr) {
//vpx_codec_iface_t* id(void) { return &id##_algo; } 
  window[id+'_algo']=create_obj_vals_from_array(vpx_codec_iface_t,arr);
}

var VPX_CODEC_INTERNAL_ABI_VERSION = (3); /**<\hideinitializer*/

var VPX_CODEC_CAP_DECODER = 0x1; /**< Is a decoder */

var vpx_codec_ctrl_fn_map_t = function()
{
    this.ctrl_id=int_,
    this.fn=0//'todo:findfuction:vpx_codec_control_fn_t'
} ;

/*!\brief Decoder algorithm interface interface 285
 *
 * All decoders \ref MUST expose a variable of this type.
 */
var vpx_codec_iface = function()
{
    this.name=char_,        /**< Identification String  */	//*name
    this.abi_version=int_, /**< Implemented ABI version */
    this.caps=long_,//todo //vpx_codec_caps_t,  sollte erst inialisiert werden wenn variable verf?gbar //typedef long  /**< Decoder capabilities */
    this.init='vpx_codec_init_fn_t',    /**< \copydoc ::vpx_codec_init_fn_t */
    this.destroy='vpx_codec_destroy_fn_t',     /**< \copydoc ::vpx_codec_destroy_fn_t */
    this.ctrl_maps=new vpx_codec_ctrl_fn_map_t(),   /**< \copydoc ::vpx_codec_ctrl_fn_map_t */
    this.get_mmap='vpx_codec_get_mmap_fn_t',    /**< \copydoc ::vpx_codec_get_mmap_fn_t */
    this.set_mmap='vpx_codec_set_mmap_fn_t',    /**< \copydoc ::vpx_codec_set_mmap_fn_t */
    this.dec=new Object(
    {
        peek_si:'vpx_codec_peek_si_fn_t',     /**< \copydoc ::vpx_codec_peek_si_fn_t */
        get_si:'vpx_codec_get_si_fn_t',      /**< \copydoc ::vpx_codec_peek_si_fn_t */
        decode:'vpx_codec_decode_fn_t',      /**< \copydoc ::vpx_codec_decode_fn_t */
        get_frame:'vpx_codec_get_frame_fn_t'   /**< \copydoc ::vpx_codec_get_frame_fn_t */
    })
};

    var vpx_codec_iface_t=vpx_codec_iface;

var VERSION_STRING      = " v0.9.7";

        var VPX_CODEC_OK=0,
        VPX_CODEC_MEM_ERROR=2;//,



    /*!\brief Current ABI version number 23
     *
     * \internal
     * If this file is altered in any way that changes the ABI, this value
     * must be bumped.  Examples include, but are not limited to, changing
     * types, removing or reassigning enums, adding/removing/rearranging
     * fields to structures
     */
var VPX_IMAGE_ABI_VERSION =(1); /**<\hideinitializer*/

//56
VPX_IMG_FMT_I420    = 258;// todo:VPX_IMG_FMT_I420    = VPX_IMG_FMT_PLANAR | 2,
//58
VPX_IMG_FMT_VPXI420 = 260;// todo:VPX_IMG_FMT_VPXI420 = VPX_IMG_FMT_PLANAR | 4

    /**\brief Image Descriptor */
        /* Image data pointers. */
var VPX_PLANE_PACKED = 0;   /**< To be used for all packed formats */
var VPX_PLANE_Y      = 0;   /**< Y (Luminance) plane */
var VPX_PLANE_U      = 1;   /**< U (Chroma) plane */
var VPX_PLANE_V      = 2;   /**< V (Chroma) plane */
var VPX_PLANE_ALPHA  = 3;   /**< A (Transparency) plane */
//#if !defined(VPX_CODEC_DISABLE_COMPAT) || !VPX_CODEC_DISABLE_COMPAT
var  PLANE_PACKED     = VPX_PLANE_PACKED;
var  PLANE_Y          = VPX_PLANE_Y;
var  PLANE_U          = VPX_PLANE_U;
var  PLANE_V          = VPX_PLANE_V;
var  PLANE_ALPHA      = VPX_PLANE_ALPHA;
//#endif
    var vpx_image_t = function() //vpx_image
    {
        this.fmt=0, //enum /**< Image Format */'vpx_img_fmt_t'

        /* Image storage dimensions */
        this.w=this["w"]=int_,   /**< Stored image width */
        this.h=this["h"]=int_,   /**< Stored image height */

        /* Image display dimensions */
        this.d_w=this["d_w"]=int_,   /**< Displayed image width */
        this.d_h=this["d_h"]=int_,   /**< Displayed image height */

        /* Chroma subsampling info */
        this.x_chroma_shift=this["x_chroma_shift"]=int_,   /**< subsampling order, X */
        this.y_chroma_shift=this["y_chroma_shift"]=int_,   /**< subsampling order, Y */

        this.planes=this["planes"]=new Array(4),/*,char),*/ this.planes_off=this["planes_off"]=new Array(4),//,char),//unsigned char *planes[4];  /**< pointer to the top left pixel for each plane */
        this.stride=this["stride"]=new Array(4),//,int_),  /**< stride between rows for each plane */

        this.bps=this["bps"]=int_, /**< bits per sample (for packed formats) */

        /* The following member may be set by the application to associate data
         * with this image.
         */
        this.user_priv=this["user_priv"]=void_, /* /**< may be set by the application to associate data 
                         *   with this image. */

        /* The following members should be treated as private. */
        this.img_data=this["img_data"]=char_,       /**< private */
        this.img_data_off=this["img_data_off"]=0,       /**< private */
        this.img_data_owner=this["img_data_owner"]=int_, /**< private */
        this.self_allocd=this["self_allocd"]=int_     /**< private */
    } ; /**< alias for struct vpx_image */




/** @file 62
    The <tt>libnestegg</tt> C API. */

var NESTEGG_TRACK_VIDEO = 0; /**< Track is of type video. */
var NESTEGG_TRACK_AUDIO = 1; /**< Track is of type audio. */

var NESTEGG_CODEC_VP8    = 0; /**< Track uses Google On2 VP8 codec. */
var NESTEGG_CODEC_VORBIS = 1; /**< Track uses Xiph Vorbis codec. */

//71
var NESTEGG_SEEK_SET = 0; /**< Seek offset relative to beginning of stream. */
var NESTEGG_SEEK_CUR = 1; /**< Seek offset relative to current position in stream. */
var NESTEGG_SEEK_END = 2; /**< Seek offset relative to end of stream. */

//76
var NESTEGG_LOG_DEBUG    = 1;     /**< Debug level log message. */
var NESTEGG_LOG_INFO     = 10;    /**< Informational level log message. */
var NESTEGG_LOG_WARNING  = 100;   /**< Warning level log message. */
var NESTEGG_LOG_ERROR    = 1000;  /**< Error level log message. */
var NESTEGG_LOG_CRITICAL = 10000; /**< Critical level log message. */

/** User supplied IO context. 84 */
var nestegg_io = function(){
  /** User supplied read callback.
      @param buffer   Buffer to read data into.
      @param length   Length of supplied buffer in bytes.
      @param userdata The #userdata supplied by the user.
      @retval  1 Read succeeded.
      @retval  0 End of stream.
      @retval -1 Error. */
  //int (* read)(void * buffer, size_t length, void * userdata);
  this.read=int_,

  /** User supplied seek callback.
      @param offset   Offset within the stream to seek to.
      @param whence   Seek direction.  One of #NESTEGG_SEEK_SET,
                      #NESTEGG_SEEK_CUR, or #NESTEGG_SEEK_END.
      @param userdata The #userdata supplied by the user.
      @retval  0 Seek succeeded.
      @retval -1 Error. */
  //int (* seek)(int64_t offset, int whence, void * userdata);
  this.seek=int_,

  /** User supplied tell callback.
      @param userdata The #userdata supplied by the user.
      @returns Current position within the stream.
      @retval -1 Error. */
  //int64_t (* tell)(void * userdata);
  this.tell=int64_t,

  /** User supplied pointer to be passed to the IO callbacks. */
  //void * userdata;


  this.userdata=void_ //*
} ;

/** Parameters specific to a video track. */
var nestegg_video_params = function(){
  this.width=int_,          /**< Width of the video frame in pixels. */
  this.height=int_,         /**< Height of the video frame in pixels. */
  this.display_width=int_,  /**< Display width of the video frame in pixels. */
  this.display_height=int_, /**< Display height of the video frame in pixels. */
  this.crop_bottom=int_,    /**< Pixels to crop from the bottom of the frame. */
  this.crop_top=int_,       /**< Pixels to crop from the top of the frame. */
  this.crop_left=int_,      /**< Pixels to crop from the left of the frame. */
  this.crop_right=int_     /**< Pixels to crop from the right of the frame. */
} ;




/* EBML Elements 14 */
var ID_EBML                 = 0x1a45dfa3;
var ID_EBML_VERSION         = 0x4286;
var ID_EBML_READ_VERSION    = 0x42f7;
var ID_EBML_MAX_ID_LENGTH   = 0x42f2;
var ID_EBML_MAX_SIZE_LENGTH = 0x42f3;
var ID_DOCTYPE              = 0x4282;
var ID_DOCTYPE_VERSION      = 0x4287;
var ID_DOCTYPE_READ_VERSION = 0x4285;

/* Global Elements */
var ID_VOID               = 0xec;
var ID_CRC32              = 0xbf;

/* WebMedia Elements */
var ID_SEGMENT            = 0x18538067;

/* Seek Head Elements */
var ID_SEEK_HEAD          = 0x114d9b74;
var ID_SEEK               = 0x4dbb;
var ID_SEEK_ID            = 0x53ab;
var ID_SEEK_POSITION      = 0x53ac;

/* Info Elements */
var ID_INFO               = 0x1549a966;
var ID_TIMECODE_SCALE     = 0x2ad7b1;
var ID_DURATION           = 0x4489;

/* Cluster Elements */
var ID_CLUSTER            = 0x1f43b675;
var ID_TIMECODE           = 0xe7;
var ID_BLOCK_GROUP        = 0xa0;
var ID_SIMPLE_BLOCK       = 0xa3;

/* BlockGroup Elements */
var ID_BLOCK              = 0xa1;
var ID_BLOCK_DURATION     = 0x9b;
var ID_REFERENCE_BLOCK    = 0xfb;

/* Tracks Elements */
var ID_TRACKS             = 0x1654ae6b;
var ID_TRACK_ENTRY        = 0xae;
var ID_TRACK_NUMBER       = 0xd7;
var ID_TRACK_UID          = 0x73c5;
var ID_TRACK_TYPE         = 0x83;
var ID_FLAG_ENABLED       = 0xb9;
var ID_FLAG_DEFAULT       = 0x88;
var ID_FLAG_LACING        = 0x9c;
var ID_TRACK_TIMECODE_SCALE=0x23314f;
var ID_LANGUAGE           = 0x22b59c;
var ID_CODEC_ID           = 0x86;
var ID_CODEC_PRIVATE      = 0x63a2;

/* Video Elements */
var ID_VIDEO              = 0xe0;
var ID_PIXEL_WIDTH        = 0xb0;
var ID_PIXEL_HEIGHT       = 0xba;
var ID_PIXEL_CROP_BOTTOM  = 0x54aa;
var ID_PIXEL_CROP_TOP     = 0x54bb;
var ID_PIXEL_CROP_LEFT    = 0x54cc;
var ID_PIXEL_CROP_RIGHT   = 0x54dd;
var ID_DISPLAY_WIDTH      = 0x54b0;
var ID_DISPLAY_HEIGHT     = 0x54ba;

/* Audio Elements */
var ID_AUDIO              = 0xe1;
var ID_SAMPLING_FREQUENCY = 0xb5;
var ID_CHANNELS           = 0x9f;
var ID_BIT_DEPTH          = 0x6264;

/* Cues Elements */
var ID_CUES               = 0x1c53bb6b;
var ID_CUE_POINT          = 0xbb;
var ID_CUE_TIME           = 0xb3;
var ID_CUE_TRACK_POSITIONS= 0xb7;
var ID_CUE_TRACK          = 0xf7;
var ID_CUE_CLUSTER_POSITION=0xf1;
var ID_CUE_BLOCK_NUMBER   = 0x5378;

/* EBML Types 93 */
var //ebml_type_enum = {
  TYPE_UNKNOWN=0,
  TYPE_MASTER=1,
  TYPE_UINT=2,
  TYPE_FLOAT=3,
  TYPE_INT=4,
  TYPE_STRING=5,
  TYPE_BINARY=6
//}
;

var LIMIT_STRING            = (1 << 20);
var LIMIT_BINARY            = (1 << 24);
var LIMIT_BLOCK             = (1 << 30);
var LIMIT_FRAME             = (1 << 28);

/* Field Flags 109 */
var DESC_FLAG_NONE          = 0;
var DESC_FLAG_MULTI         = (1 << 0);
var DESC_FLAG_SUSPEND       = (1 << 1);
var DESC_FLAG_OFFSET        = (1 << 2);

/* Block Header Flags */
var BLOCK_FLAGS_LACING      = 6;

/* Lacing Constants */
var LACING_NONE             = 0;
var LACING_XIPH             = 1;
var LACING_FIXED            = 2;
var LACING_EBML             = 3;

/* Track Types */
var TRACK_TYPE_VIDEO        = 1;
var TRACK_TYPE_AUDIO        = 2;

/* Track IDs */
var TRACK_ID_VP8            = "V_VP8";
var TRACK_ID_VORBIS         = "A_VORBIS";

var// vint_mask {
  MASK_NONE=0,
  MASK_FIRST_BIT=1
//}
;

//137
var ebml_binary = function(){
  this.data=char_,//*
  this.length=size_t
};

var ebml_list_node = function(){
  this.next=null,//'ebml_list_node',//*
  this.id=uint64_t,
  this.data=void_//*
};

var ebml_list = function(){
  this.head=null,//'newObjectI(ebml_list_node)',//*
  this.tail=null//'newObjectI(ebml_list_node)'//*
};

var ebml_type = function(){
  this.v=new Object({//union ebml_value
    u:uint64_t,
    f:double_,
    i:int64_t,
    s:char_,//*
    b:new ebml_binary()
  }),
  this.type=0, //enum'ebml_type_enum'
  this.read=int_
};

/* EBML Definitions 165 */
var ebml = window["ebml"] = function(){
  this.ebml_version=this["ebml_version"]=new ebml_type(),
  this.ebml_read_version=this["ebml_read_version"]=new ebml_type(),
  this.ebml_max_id_length=this["ebml_max_id_length"]=new ebml_type(),
  this.ebml_max_size_length=this["ebml_max_size_length"]=new ebml_type(),
  this.doctype=this["doctype"]=new ebml_type(),
  this.doctype_version=this["doctype_version"]=new ebml_type(),
  this.doctype_read_version=this["doctype_read_version"]=new ebml_type()
};

/* Matroksa Definitions */
var seek = window["seek"] = function(){
  this.id=this["id"]=new ebml_type(),
  this.position=this["position"]=new ebml_type()
};

var seek_head = window["seek_head"] = function(){
  this.seek=this["seek"]=new ebml_list()
};

var info = window["info"] = function(){
  this.timecode_scale=this["timecode_scale"]=new ebml_type(),
  this.duration=this["duration"]=new ebml_type()
};

var block_group = window["block_group"] = function(){
  this.duration=this["duration"]=new ebml_type(),
  this.reference_block=this["reference_block"]=new ebml_type()
};

var cluster = window["cluster"] = function(){
  this.timecode=this["timecode"]=new ebml_type(),
  this.block_group=this["block_group"]=new ebml_list()
};

var video = window["video"] = function(){
  this.pixel_width=this["pixel_width"]=new ebml_type(),
  this.pixel_height=this["pixel_height"]=new ebml_type(),
  this.pixel_crop_bottom=this["pixel_crop_bottom"]=new ebml_type(),
  this.pixel_crop_top=this["pixel_crop_top"]=new ebml_type(),
  this.pixel_crop_left=this["pixel_crop_left"]=new ebml_type(),
  this.pixel_crop_right=this["pixel_crop_right"]=new ebml_type(),
  this.display_width=this["display_width"]=new ebml_type(),
  this.display_height=this["display_height"]=new ebml_type()
};

var audio = window["audio"] = function(){
  this.sampling_frequency=this["sampling_frequency"]=new ebml_type(),
  this.channels=this["channels"]=new ebml_type(),
  this.bit_depth=this["bit_depth"]=new ebml_type()
};

var track_entry = window["track_entry"] = function(){
  this.number=this["number"]=new ebml_type(),
  this.uid=this["uid"]=new ebml_type(),
  this.type=this["type"]=new ebml_type(),
  this.flag_enabled=this["flag_enabled"]=new ebml_type(),
  this.flag_default=this["flag_default"]=new ebml_type(),
  this.flag_lacing=this["flag_lacing"]=new ebml_type(),
  this.track_timecode_scale=this["track_timecode_scale"]=new ebml_type(),
  this.language=this["language"]=new ebml_type(),
  this.codec_id=this["codec_id"]=new ebml_type(),
  this.codec_private=this["codec_private"]=new ebml_type(),
  this.video=this["video"]=new video(),
  this.audio=this["audio"]=new audio()
};

var tracks = window["tracks"] = function(){
  this.track_entry=this["track_entry"]=new ebml_list()
};

var cue_track_positions = window["cue_track_positions"] = function(){
  this.track=this["track"]=new ebml_type(),
  this.cluster_position=this["cluster_position"]=new ebml_type(),
  this.block_number=this["block_number"]=new ebml_type()
};

var cue_point = window["cue_point"] = function(){
  this.time=this["time"]=new ebml_type(),
  this.cue_track_positions=this["cue_track_positions"]=new ebml_list()
};

var cues = window["cues"] = function(){
  this.cue_point=this["cue_point"]=new ebml_list()
};

var segment = window["segment"] = function(){
  this.seek_head=this["seek_head"]=new ebml_list(),
  this.info=this["info"]=new info(),
  this.cluster=this["cluster"]=new ebml_list(),
  this.tracks=this["tracks"]=new tracks(),
  this.cues=this["cues"]=new cues()
};

/* Misc. 260 */
var pool_ctx = function(){
   this.dummy=char_
};

var list_node = function(){
  this.previous=0, //todo: endlosschleife verhindern //*'list_node'
  this.node=new ebml_element_desc(),//*
  this.data=char_ //*
};

var frame = function() {
  this.data=char_,
  this.length=size_t,
  this.next=null//'frame'
};

/* Public (opaque) Structures 284 */
var nestegg = function(){
  this.io=new nestegg_io(), //*
  this.log_=0,//'nestegg_log' todo:
  this.alloc_pool=new pool_ctx(), //*
  this.last_id=uint64_t,
  this.last_size=uint64_t,
  this.ancestor=null,//'newObjectI(list_node)',//*
  this.ebml=this["ebml"]=new ebml(),
  this.segment=this["segment"]=new segment(),
  this.segment_offset=int64_t,
  this.track_count=int_
};

var nestegg_packet = function() {
  this.track=uint64_t,
  this.timecode=uint64_t,
  this.frame=new frame()//*
};

/* Element Descriptor 304 */
var ebml_element_desc = function(){
  this.name=char_,//const *
  this.id=uint64_t,
  this.type=0, //enum'ebml_type_enum'
  this.offset=size_t,
  this.flags=int_,
  this.children=null,//wiederholungsschleife //*'ebml_element_desc'
  this.size=size_t,
  this.data_offset=size_t
};

function E_FIELD(ID, _ID, TYPE, STRUCT, FIELD) {
  return new Array( ID, _ID, TYPE, FIELD/*offsetof(STRUCT, FIELD)*/, DESC_FLAG_NONE, null, 0, 0 ) }
function E_MASTER(ID, _ID, TYPE, STRUCT, FIELD, NE_FIELD_ELEMENTS) {
  return new Array( ID, _ID, TYPE, FIELD/*offsetof(STRUCT, FIELD)*/, DESC_FLAG_MULTI, NE_FIELD_ELEMENTS,
      1/*sizeof(FIELD)*/, 0 ) }
function E_SINGLE_MASTER_O(ID, _ID, TYPE, STRUCT, FIELD, NE_FIELD_ELEMENTS) {
  return new Array( ID, _ID, TYPE, FIELD/*offsetof(STRUCT, FIELD)*/, DESC_FLAG_OFFSET, NE_FIELD_ELEMENTS, 0,
      FIELD+'_offset'/*offsetof(STRUCT, FIELD+'_offset')*/ ) }
function E_SINGLE_MASTER(ID, _ID, TYPE, STRUCT, FIELD, NE_FIELD_ELEMENTS) {
  return new Array( ID, _ID, TYPE, FIELD/*offsetof(STRUCT, FIELD)*/, DESC_FLAG_NONE, NE_FIELD_ELEMENTS, 0, 0 ) }
function E_SUSPEND(ID, _ID, TYPE) {
  return new Array( ID, _ID, TYPE, 0, DESC_FLAG_SUSPEND, null, 0, 0 ) }
var E_LAST =
  new Array( null, 0, 0, 0, DESC_FLAG_NONE, null, 0, 0 );

/* EBML Element Lists */
var ne_ebml_elements = create_ebml_element_desc(new Array(
  E_FIELD('ID_EBML_VERSION', ID_EBML_VERSION, TYPE_UINT, 'ebml', 'ebml_version'),
  E_FIELD('ID_EBML_READ_VERSION', ID_EBML_READ_VERSION, TYPE_UINT, 'ebml', 'ebml_read_version'),
  E_FIELD('ID_EBML_MAX_ID_LENGTH', ID_EBML_MAX_ID_LENGTH, TYPE_UINT, 'ebml', 'ebml_max_id_length'),
  E_FIELD('ID_EBML_MAX_SIZE_LENGTH', ID_EBML_MAX_SIZE_LENGTH, TYPE_UINT, 'ebml', 'ebml_max_size_length'),
  E_FIELD('ID_DOCTYPE', ID_DOCTYPE, TYPE_STRING, 'ebml', 'doctype'),
  E_FIELD('ID_DOCTYPE_VERSION', ID_DOCTYPE_VERSION, TYPE_UINT, 'ebml', 'doctype_version'),
  E_FIELD('ID_DOCTYPE_READ_VERSION', ID_DOCTYPE_READ_VERSION, TYPE_UINT, 'ebml', 'doctype_read_version'),
  E_LAST
));

/* WebMedia Element Lists */
var ne_seek_elements = create_ebml_element_desc(new Array(
  E_FIELD('ID_SEEK_ID', ID_SEEK_ID, TYPE_BINARY, 'seek', 'id'),
  E_FIELD('ID_SEEK_POSITION', ID_SEEK_POSITION, TYPE_UINT, 'seek', 'position'),
  E_LAST
));

var ne_seek_head_elements = create_ebml_element_desc(new Array(
  E_MASTER('ID_SEEK', ID_SEEK, TYPE_MASTER, 'seek_head', 'seek', ne_seek_elements),
  E_LAST
));

var ne_info_elements = create_ebml_element_desc(new Array(
  E_FIELD('ID_TIMECODE_SCALE', ID_TIMECODE_SCALE, TYPE_UINT, 'info', 'timecode_scale'),
  E_FIELD('ID_DURATION', ID_DURATION, TYPE_FLOAT, 'info', 'duration'),
  E_LAST
));

var ne_block_group_elements = create_ebml_element_desc(new Array(
  E_SUSPEND('ID_BLOCK', ID_BLOCK, TYPE_BINARY),
  E_FIELD('ID_BLOCK_DURATION', ID_BLOCK_DURATION, TYPE_UINT, 'block_group', 'duration'),
  E_FIELD('ID_REFERENCE_BLOCK', ID_REFERENCE_BLOCK, TYPE_INT, 'block_group', 'reference_block'),
  E_LAST
));

var ne_cluster_elements = create_ebml_element_desc(new Array(
  E_FIELD('ID_TIMECODE', ID_TIMECODE, TYPE_UINT, 'cluster', 'timecode'),
  E_MASTER('ID_BLOCK_GROUP', ID_BLOCK_GROUP, TYPE_MASTER, 'cluster', 'block_group', ne_block_group_elements),
  E_SUSPEND('ID_SIMPLE_BLOCK', ID_SIMPLE_BLOCK, TYPE_BINARY),
  E_LAST
));

var ne_video_elements = create_ebml_element_desc(new Array(
  E_FIELD('ID_PIXEL_WIDTH', ID_PIXEL_WIDTH, TYPE_UINT, 'video', 'pixel_width'),
  E_FIELD('ID_PIXEL_HEIGHT', ID_PIXEL_HEIGHT, TYPE_UINT, 'video', 'pixel_height'),
  E_FIELD('ID_PIXEL_CROP_BOTTOM', ID_PIXEL_CROP_BOTTOM, TYPE_UINT, 'video', 'pixel_crop_bottom'),
  E_FIELD('ID_PIXEL_CROP_TOP', ID_PIXEL_CROP_TOP, TYPE_UINT, 'video', 'pixel_crop_top'),
  E_FIELD('ID_PIXEL_CROP_LEFT', ID_PIXEL_CROP_LEFT, TYPE_UINT, 'video', 'pixel_crop_left'),
  E_FIELD('ID_PIXEL_CROP_RIGHT', ID_PIXEL_CROP_RIGHT, TYPE_UINT, 'video', 'pixel_crop_right'),
  E_FIELD('ID_DISPLAY_WIDTH', ID_DISPLAY_WIDTH, TYPE_UINT, 'video', 'display_width'),
  E_FIELD('ID_DISPLAY_HEIGHT', ID_DISPLAY_HEIGHT, TYPE_UINT, 'video', 'display_height'),
  E_LAST
));

var ne_audio_elements = create_ebml_element_desc(new Array(
  E_FIELD('ID_SAMPLING_FREQUENCY', ID_SAMPLING_FREQUENCY, TYPE_FLOAT, 'audio', 'sampling_frequency'),
  E_FIELD('ID_CHANNELS', ID_CHANNELS, TYPE_UINT, 'audio', 'channels'),
  E_FIELD('ID_BIT_DEPTH', ID_BIT_DEPTH, TYPE_UINT, 'audio', 'bit_depth'),
  E_LAST
));

var ne_track_entry_elements = create_ebml_element_desc(new Array(
  E_FIELD('ID_TRACK_NUMBER', ID_TRACK_NUMBER, TYPE_UINT, 'track_entry', 'number'),
  E_FIELD('ID_TRACK_UID', ID_TRACK_UID, TYPE_UINT, 'track_entry', 'uid'),
  E_FIELD('ID_TRACK_TYPE', ID_TRACK_TYPE, TYPE_UINT, 'track_entry', 'type'),
  E_FIELD('ID_FLAG_ENABLED', ID_FLAG_ENABLED, TYPE_UINT, 'track_entry', 'flag_enabled'),
  E_FIELD('ID_FLAG_DEFAULT', ID_FLAG_DEFAULT, TYPE_UINT, 'track_entry', 'flag_default'),
  E_FIELD('ID_FLAG_LACING', ID_FLAG_LACING, TYPE_UINT, 'track_entry', 'flag_lacing'),
  E_FIELD('ID_TRACK_TIMECODE_SCALE', ID_TRACK_TIMECODE_SCALE, TYPE_FLOAT, 'track_entry', 'track_timecode_scale'),
  E_FIELD('ID_LANGUAGE', ID_LANGUAGE, TYPE_STRING, 'track_entry', 'language'),
  E_FIELD('ID_CODEC_ID', ID_CODEC_ID, TYPE_STRING, 'track_entry', 'codec_id'),
  E_FIELD('ID_CODEC_PRIVATE', ID_CODEC_PRIVATE, TYPE_BINARY, 'track_entry', 'codec_private'),
  E_SINGLE_MASTER('ID_VIDEO', ID_VIDEO, TYPE_MASTER, 'track_entry', 'video', ne_video_elements),
  E_SINGLE_MASTER('ID_AUDIO', ID_AUDIO, TYPE_MASTER, 'track_entry', 'audio', ne_audio_elements),
  E_LAST
));

var ne_tracks_elements = create_ebml_element_desc(new Array(
  E_MASTER('ID_TRACK_ENTRY', ID_TRACK_ENTRY, TYPE_MASTER, 'tracks', 'track_entry', ne_track_entry_elements),
  E_LAST
));

var ne_cue_track_positions_elements = create_ebml_element_desc(new Array(
  E_FIELD('ID_CUE_TRACK', ID_CUE_TRACK, TYPE_UINT, 'cue_track_positions', 'track'),
  E_FIELD('ID_CUE_CLUSTER_POSITION', ID_CUE_CLUSTER_POSITION, TYPE_UINT, 'cue_track_positions', 'cluster_position'),
  E_FIELD('ID_CUE_BLOCK_NUMBER', ID_CUE_BLOCK_NUMBER, TYPE_UINT, 'cue_track_positions', 'block_number'),
  E_LAST
))

var ne_cue_point_elements = create_ebml_element_desc(new Array(
  E_FIELD('ID_CUE_TIME', ID_CUE_TIME, TYPE_UINT, 'cue_point', 'time'),
  E_MASTER('ID_CUE_TRACK_POSITIONS', ID_CUE_TRACK_POSITIONS, TYPE_MASTER, 'cue_point', 'cue_track_positions', ne_cue_track_positions_elements),
  E_LAST
));

var ne_cues_elements = create_ebml_element_desc(new Array(
  E_MASTER('ID_CUE_POINT', ID_CUE_POINT, TYPE_MASTER, 'cues', 'cue_point', ne_cue_point_elements),
  E_LAST
));

var ne_segment_elements = create_ebml_element_desc(new Array(
  E_MASTER('ID_SEEK_HEAD', ID_SEEK_HEAD, TYPE_MASTER, 'segment', 'seek_head', ne_seek_head_elements),
  E_SINGLE_MASTER('ID_INFO', ID_INFO, TYPE_MASTER, 'segment', 'info', ne_info_elements),
  E_MASTER('ID_CLUSTER', ID_CLUSTER, TYPE_MASTER, 'segment', 'cluster', ne_cluster_elements),
  E_SINGLE_MASTER('ID_TRACKS', ID_TRACKS, TYPE_MASTER, 'segment', 'tracks', ne_tracks_elements),
  E_SINGLE_MASTER('ID_CUES', ID_CUES, TYPE_MASTER, 'segment', 'cues', ne_cues_elements),
  E_LAST
));

//442
var ne_top_level_elements = create_ebml_element_desc(new Array(
  E_SINGLE_MASTER('ID_EBML', ID_EBML, TYPE_MASTER, 'nestegg', 'ebml', ne_ebml_elements),
  E_SINGLE_MASTER_O('ID_SEGMENT', ID_SEGMENT, TYPE_MASTER, 'nestegg', 'segment', ne_segment_elements),
  E_LAST
));

function create_ebml_element_desc(Arr) {
	var newArr=new Array();
	for(var i=0;i<Arr.length;++i) {
		var a=0;
		var createitem = new ebml_element_desc();
		
		for (var key in createitem)//ebml_element_desc
			if(Arr[i][a]!=='undefined')
				createitem[key]=Arr[i][a++];
				
		newArr.push(createitem);
	}
	return newArr;
}
//455
function
ne_pool_init(void_)
{
  var pool=new pool_ctx();//*

  //todo: pool = h_malloc(sizeof(*pool));
  //if (!pool)
  //  abort();
  return pool;
}

var buffer_8192=Arr(8192,0);
function //508
ne_io_read_skip(io, length)
{
  var get_=size_t;
  var buf={val:buffer_8192};//,char_
  var r = 1;

  while (length > 0) {
    get_ = length < /*sizeof(buf)**/buf.val.length ? length : /*sizeof(buf)**/buf.val.length;
    r = ne_io_read(io, buf, get_);
    if (r != 1)
      break;
    length -= get_;
  }

  return r;
}

function //526
ne_io_tell(io)
{
  return io.tell(io.userdata);
}

function
ne_bare_read_vint(io, value, length, maskflag)
{
  var r=int_;
  var b={val:char_};
  var maxlen = 8;
  var count = 1, mask = 1 << 7;

  r = ne_io_read(io, b, 1);//&b
  if (r != 1)
    return r;

  while (count < maxlen) {
    if ((b.val[0] & mask) != 0)
      break;
    mask >>= 1;
    count += 1;
  }

  if (length)
    length.val = count;
  value.val = b.val[0];

  if (maskflag == MASK_FIRST_BIT)
    value.val = b.val[0] & ~mask;

  while (--count) {
    r = ne_io_read(io, b, 1);//&b
    if (r != 1)
      return r;
    value.val <<= 8;
    value.val |= b.val[0];
  }

  return 1;
}

function
ne_io_read(io, buffer, length)
{
  //io.userdata={val:io.userdata};
  var r = io.read(buffer, length, io.userdata);
  //io.userdata=io.userdata.val;
  return r;
}

function //569
ne_read_id(io, value, length)
{
  return ne_bare_read_vint(io, value, length, MASK_NONE);
}

function
ne_read_vint(io, value, length)
{
  return ne_bare_read_vint(io, value, length, MASK_FIRST_BIT);
}

function //581
ne_read_svint(io, value, length)
{
  var r=int_;
  var uvalue=[uint64_t];
  var ulength=[uint64_t];
  var svint_subtr = new Array(
    0x3f, 0x1fff,
    0xfffff, 0x7ffffff,
    0x3ffffffff, 0x1ffffffffff,
    0xffffffffffff, 0x7fffffffffffff
  );

  var r = ne_bare_read_vint(io, uvalue, ulength, MASK_FIRST_BIT);
  if (r != 1)
    return r;
  value[0] = uvalue - svint_subtr[ulength - 1];
  if (length)
    length[0] = ulength;
  return r;
}

function //603
ne_read_uint(io, val, length)
{
  var b={val:char_};
  var r=int_;

  if (length == 0 || length > 8)
    return -1;
  r = ne_io_read(io, b, 1);
  if (r != 1)
    return r;
  val[0] = b.val[0];//result
  while (--length) {
    r = ne_io_read(io, b, 1);
    if (r != 1)
      return r;
    val[0] <<= 8;//result
    val[0] |= b.val[0];//result
  }
  return 1;
}

function //625
ne_read_int(io, val, length)
{
  var r=int_;
  var uval=[uint64_t], base=uint64_t;

  r = ne_read_uint(io, uval, length);
  if (r != 1)
    return r;

  if (length < /*sizeof(int64_t)**/8) {
    base = 1;
    base <<= length * 8 - 1;
    if (uval >= base) {
        base = 1;
        base <<= length * 8;
    } else {
      base = 0;
    }
    val[0] = uval - base;
  } else {
    val[0] = uval;//(int64_t) 
  }

  return 1;
}

function //652
ne_read_float(io, val, length)
{
  var value = {//union
    u:[uint64_t],
    f:[float_],
    d:[double_]
  } ;
  var r=int_;

  /* length == 10 not implemented */
  if (length != 4 && length != 8)
    return -1;
  r = ne_read_uint(io, value.u, length);
  if (r != 1)
    return r;
  if (length == 4)
    val[0] = value.f = value.u;//'u'+
  else
    val[0] = value.d = value.u;//'u'+
  return 1;
}

function //675
ne_read_string(ctx, val, length)
{
  var str={val:char_};//*
  var r=int_;

  if (length == 0 || length > LIMIT_STRING)
    return -1;
  //str = ne_pool_alloc(length + 1, ctx->alloc_pool);
  r = ne_io_read(ctx.io, str, length);
  if (r != 1)
    return r;
	var str2='';for(var i=0;i<length;++i)str2 +=String.fromCharCode(str.val[i]);str.val=str2;
  //str[length] = '\0';//todo: ???
  val[0] = str.val;
  return 1;
}

function //692
ne_read_binary(ctx, val, length)
{
  if (length == 0 || length > LIMIT_BINARY)
    return -1;
  val.data = {val:0};//'ne_pool_alloc(length, ctx->alloc_pool)'
  val.length = length;
  return ne_io_read(ctx.io, val.data, length);
}

function //702
ne_get_uint(type, value)
{
  if (!type.read)
    return -1;

  assert(type.type == TYPE_UINT);

  value[0] = type.v.u;

  return 0;
}

function //728
ne_get_string(type, value)
{
  if (!type.read)
    return -1;

  assert(type.type == TYPE_STRING);

  value[0] = type.v.s;

  return 0;
}

function //754
ne_is_ancestor_element(id, ancestor)
{
  //var element;//=new ebml_element_desc();//*

  for (; ancestor; ancestor = ancestor.previous)
    for (var element = ancestor.node,element_pos = 0; element[element_pos].id; ++element_pos)
	//for (element = ancestor->node; element->id; ++element)
      if (element[element_pos].id == id)
        return 1;

  return 0;
}

function //767
ne_find_element(id, elements)
{
  //todo: why is this set?  ->  var element=newObjectI(ebml_element_desc);
  //for (element = elements; element.id; ++element)
  for (var element = elements,element_pos = 0; element[element_pos].id; ++element_pos)
    if (element[element_pos].id == id)
      return element[element_pos];

  return null;
}

function //779
ne_ctx_push(ctx, ancestor, data)
{
  var item_=new list_node();//*

  //todo: item_ = ne_alloc(sizeof(item_));
  item_.previous = ctx.ancestor;
  item_.node = ancestor;
  item_.data = data;
  ctx.ancestor = item_;
}

function //791
ne_ctx_pop(ctx)
{
  var item_;//=new list_node();//*

  item_ = ctx.ancestor;
  ctx.ancestor = item_.previous;
  //free(item_);
  item_='';
}

//827
function
ne_peek_element(ctx, id, size)
{
  var r=int_;

  if (ctx.last_id && ctx.last_size) {
    if (id)
      id[0] = ctx.last_id;
    if (size)
      size[0] = ctx.last_size;
    return 1;
  }
  ctx.last_id	=	{val:ctx.last_id};
  r = ne_read_id(ctx.io, ctx.last_id, null);//&ctx.last_id
  ctx.last_id	=	ctx.last_id.val;
  if (r != 1)
    return r;

  ctx.last_size	=	{val:ctx.last_size};
  r = ne_read_vint(ctx.io, ctx.last_size, null);
  ctx.last_size	=	ctx.last_size.val;
  if (r != 1)
    return r;

  if (id)
    id[0] = ctx.last_id;
  if (size)
    size[0] = ctx.last_size;

  return 1;
}

function //856
ne_read_element(ctx, id, size)
{
  var r=int_;

  r = ne_peek_element(ctx, id, size);
  if (r != 1)
    return r;

  ctx.last_id = 0;
  ctx.last_size = 0;

  return 1;
}

function //871
ne_read_master(ctx, desc)
{
  var list; //todo must it set? //*=new ebml_list()
  var node=new ebml_list_node(), oldtail;//*=new ebml_list_node()

  assert(desc.type == TYPE_MASTER && desc.flags & DESC_FLAG_MULTI);

//  ctx.log(ctx, NESTEGG_LOG_DEBUG, "multi master element %llx (%s)",
//           desc.id, desc.name);
if (!!ctx.ancestor.data[desc.offset])
  list = (ctx.ancestor.data[desc.offset]);//   (struct ebml_list *) 

  //node = ne_pool_alloc(sizeof(*node), ctx->alloc_pool);
  node.id = desc.id;
  node.data = new window[desc.offset]();//newObjectI(ebml_list);//'ne_pool_alloc(desc.size, ctx.alloc_pool)';

  oldtail = list.tail;
  if (oldtail)
    oldtail.next = node;
  list.tail = node;
  if (!list.head)
    list.head = node;

//  ctx.log(ctx, NESTEGG_LOG_DEBUG, " -> using data %p", node.data);

  ne_ctx_push(ctx, desc.children, node.data);
}


function //900
ne_read_single_master(ctx, desc)
{
  assert(desc.type == TYPE_MASTER && !(desc.flags & DESC_FLAG_MULTI));

//  ctx.log(ctx, NESTEGG_LOG_DEBUG, "single master element %llx (%s)",
//           desc.id, desc.name);
//  ctx.log(ctx, NESTEGG_LOG_DEBUG, " -> using data %p (%u)",
//           ctx.ancestor.data + desc.offset, desc.offset);

  ne_ctx_push(ctx, desc.children, ctx.ancestor.data[desc.offset]);
}

function //913
ne_read_simple(ctx, desc, length)
{
  var storage; //*=new ebml_type()
  var r=int_;
if (!!ctx.ancestor.data[desc.offset])
  storage = (ctx.ancestor.data[desc.offset]);//todo: (struct ebml_type *)

  if (storage.read) {
//    ctx.log(ctx, NESTEGG_LOG_DEBUG, "element %llx (%s) already read, skipping",
//             desc.id, desc.name);
    return 0;
  }

  storage.type = desc.type;

//  ctx.log(ctx, NESTEGG_LOG_DEBUG, "element %llx (%s) -> %p (%u)",
//           desc.id, desc.name, storage, desc.offset);

  r = -1;

  switch (desc.type) {//second value with "&" return value
  case TYPE_UINT:
    storage.v.u=[storage.v.u];
    r = ne_read_uint(ctx.io, storage.v.u, length);
	storage.v.u=storage.v.u[0];
    break;
  case TYPE_FLOAT:
    storage.v.f=[storage.v.f];
    r = ne_read_float(ctx.io, storage.v.f, length);
	storage.v.f=storage.v.f[0];
    break;
  case TYPE_INT:
    storage.v.i=[storage.v.i];
    r = ne_read_int(ctx.io, storage.v.i, length);
	storage.v.i=storage.v.i[0];
    break;
  case TYPE_STRING:
    storage.v.s=[storage.v.s];
    r = ne_read_string(ctx, storage.v.s, length);
	storage.v.s=storage.v.s[0];
    break;
  case TYPE_BINARY:
    //storage.v.b=[storage.v.b];
    r = ne_read_binary(ctx, storage.v.b, length);
    break;
  case TYPE_MASTER:
  case TYPE_UNKNOWN:
    assert(0);
    break;
  }

  if (r == 1)
    storage.read = 1;

  return r;
}

function //962
ne_parse(ctx, top_level)
{
  var r=int_;
  var data_offset=int64_t;//*
  var id=[uint64_t], size=[uint64_t];
  var element;//=new ebml_element_desc();//*

  /* loop until we need to return:
     - hit suspend point
     - parse complete
     - error occurred */

  /* loop over elements at current level reading them if sublevel found,
     push ctx onto stack and continue if sublevel ended, pop ctx off stack
     and continue */

  if (!ctx.ancestor)
    return -1;
//var aa=0;
  while(1) {//for (;;) {//aa++;
    r = ne_peek_element(ctx, id, size);
    if (r != 1)
      break;

    element = ne_find_element(id[0], ctx.ancestor.node);
    if (element) {
      if (element.flags & DESC_FLAG_SUSPEND) {
        assert(element.type == TYPE_BINARY);
//        ctx.log(ctx, NESTEGG_LOG_DEBUG, "suspend parse at %llx", id[0]);
        r = 1;
        break;
      }

      r = ne_read_element(ctx, id, size);
      if (r != 1)
        break;

      if (element.flags & DESC_FLAG_OFFSET) {
        data_offset = (ctx.ancestor.data[element.data_offset])={v:null};//(int64_t *) 
         data_offset.v = ne_io_tell(ctx.io);//*
        if (data_offset < 0) {
          r = -1;
          break;
        }
      }

      if (element.type == TYPE_MASTER) {
        if (element.flags & DESC_FLAG_MULTI)
          ne_read_master(ctx, element);
        else
          ne_read_single_master(ctx, element);
        continue;
      } else {
        r = ne_read_simple(ctx, element, size[0]);
        if (r < 0)
          break;
      }
    } else if (ne_is_ancestor_element(id, ctx.ancestor.previous)) {
//      ctx.log(ctx, NESTEGG_LOG_DEBUG, "parent element %llx", id);
      if (top_level && ctx.ancestor.node == top_level) {
//        ctx.log(ctx, NESTEGG_LOG_DEBUG, "*** parse about to back up past top_level");
        r = 1;
        break;
      }
      ne_ctx_pop(ctx);
    } else {
      r = ne_read_element(ctx, id, size);
      if (r != 1)
        break;

//      if (id != ID_VOID && id != ID_CRC32)
//        ctx.log(ctx, NESTEGG_LOG_DEBUG, "unknown element %llx", id);
      r = ne_io_read_skip(ctx.io, size[0]);
      if (r != 1)
        break;
    }
  }

  if (r != 1)
    while (ctx.ancestor)
      ne_ctx_pop(ctx);

  return r;
}

function //1067
ne_read_xiph_lace_value(io, value, value_off, consumed)
{
  var r=int_;
  var lace=[uint64_t];

  r = ne_read_uint(io, lace, 1);
  if (r != 1)
    return r;
  consumed[0] += 1;

  value[value_off+ 0] = lace[0];
  while (lace[0] == 255) {
    r = ne_read_uint(io, lace, 1);
    if (r != 1)
      return r;
    consumed[0] += 1;
    value[value_off+ 0] += lace[0];
  }

  return 1;
}

function // 1090
ne_read_xiph_lacing(io, block, read, n, sizes)
{
  var r=int_;
  var i = 0;
  var sum = 0;

  while (--n) {
    r = ne_read_xiph_lace_value(io, sizes, i, read);
    if (r != 1)
      return r;
    sum += sizes[i];
    i += 1;
  }

  if (read[0] + sum > block)
    return -1;

  /* last frame is the remainder of the block */
  sizes[i] = block - read[0] - sum;
  return 1;
}

function //1113
ne_read_ebml_lacing(io, block, read, n, sizes)
{
  var r=int_;
  var lace=[uint64_t], sum=uint64_t, length=[uint64_t];
  var slace=[int64_t];
  var i = 0;

  r = ne_read_vint(io, lace, length);
  if (r != 1)
    return r;
  read[0] += length[0];

  sizes[i] = lace[0];
  sum = sizes[i];

  i += 1;
  n -= 1;

  while (--n) {
    r = ne_read_svint(io, slace, length);
    if (r != 1)
      return r;
    read[0] += length[0];
    sizes[i] = sizes[i - 1] + slace[0];
    sum += sizes[i];
    i += 1;
  }

  if (read[0] + sum > block)
    return -1;

  /* last frame is the remainder of the block */
  sizes[i] = block - read[0] - sum;
  return 1;
}

function //1150
ne_get_timecode_scale(ctx)
{
  var scale=[uint64_t];

  if (ne_get_uint(ctx.segment.info.timecode_scale, scale) != 0)
    scale[0] = 1000000;

  return scale[0];
}

function //1161
ne_find_track_entry(ctx, track)
{
  //struct ebml_list_node * node;
  var tracks = 0;

  var node = ctx.segment.tracks.track_entry.head;
  while (node) {
    assert(node.id == ID_TRACK_ENTRY);
    if (track == tracks)
      return node.data;
    tracks += 1;
    node = node.next;
  }

  return null;
}

var frame_sizes_256=Arr(256,0);
function //1179
ne_read_block(ctx, block_id, block_size, data)//nestegg_packet ** data
{
  var r=int_;
  var timecode=[int64_t], abs_timecode=int64_t;
  var pkt;//*=new nestegg_packet()
  var cluster;//=new cluster();
  var f, last;//=new frame()=new frame()
  var entry;//=new track_entry()
  var track_scale=double_;
  var track={val:uint64_t}, length={val:uint64_t}, frame_sizes=frame_sizes_256, cluster_tc=[uint64_t], flags=[uint64_t], frames=[uint64_t], tc_scale=uint64_t, total=uint64_t;//,uint64_t
  var i=int_, lacing=int_;
  var consumed = [0];

  data[0] = null;

  if (block_size > LIMIT_BLOCK)
    return -1;

  r = ne_read_vint(ctx.io, track, length);
  if (r != 1)
    return r;

  if (track.val == 0 || track.val > ctx.track_count)
    return -1;

  consumed[0] += length.val;

  r = ne_read_int(ctx.io, timecode, 2);
  if (r != 1)
    return r;

  consumed[0] += 2;

  r = ne_read_uint(ctx.io, flags, 1);
  if (r != 1)
    return r;

  consumed[0] += 1;

  frames[0] = 0;

  /* flags are different between block and simpleblock, but lacing is
     encoded the same way */
  lacing = (flags[0] & BLOCK_FLAGS_LACING) >> 1;

  switch (lacing) {
  case LACING_NONE:
    frames[0] = 1;
    break;
  case LACING_XIPH:
  case LACING_FIXED:
  case LACING_EBML:
    r = ne_read_uint(ctx.io, frames, 1);
    if (r != 1)
      return r;
    consumed[0] += 1;
    frames[0] += 1;
  }

  if (frames[0] > 256)
    return -1;

  switch (lacing) {
  case LACING_NONE:
    frame_sizes[0] = block_size - consumed[0];
    break;
  case LACING_XIPH:
    if (frames == 1)
      return -1;
    r = ne_read_xiph_lacing(ctx.io, block_size, consumed, frames, frame_sizes);
    if (r != 1)
      return r;
    break;
  case LACING_FIXED:
    if ((block_size - consumed[0]) % frames[0])
      return -1;
    for (i = 0; i < frames[0]; ++i)
      frame_sizes[i] = ((block_size - consumed[0]) / frames)>>0;//todo: parseInt add
    break;
  case LACING_EBML:
    if (frames[0] == 1)
      return -1;
    r = ne_read_ebml_lacing(ctx.io, block_size, consumed, frames, frame_sizes);
    if (r != 1)
      return r;
    break;
  }

  /* sanity check unlaced frame sizes against total block size. */
  total = consumed[0];
  for (i = 0; i < frames[0]; ++i)
    total += frame_sizes[i];
  if (total > block_size)
    return -1;

  entry = ne_find_track_entry(ctx, track.val - 1);
  if (!entry)
    return -1;

  track_scale = 1.0;

  tc_scale = ne_get_timecode_scale(ctx);

  assert(ctx.segment.cluster.tail.id == ID_CLUSTER);
  cluster = ctx.segment.cluster.tail.data;
  if (ne_get_uint(cluster.timecode, cluster_tc) != 0)
    return -1;

  abs_timecode = timecode[0] + cluster_tc[0];
  if (abs_timecode < 0)
    return -1;

  //todo: pkt = ne_alloc(sizeof(*pkt));
  pkt=new nestegg_packet();//*
  pkt.track = track.val - 1;
  pkt.timecode = abs_timecode * tc_scale * track_scale;

//  ctx.log(ctx, NESTEGG_LOG_DEBUG, "%sblock t %lld pts %f f %llx frames: %llu",
//           block_id == ID_BLOCK ? "" : "simple", pkt.track, pkt.timecode / 1e9, flags, frames);

  last = null;
  for (i = 0; i < frames[0]; ++i) {
    if (frame_sizes[i] > LIMIT_FRAME) {
      nestegg_free_packet(pkt);
      return -1;
    }
    //todo: f = ne_alloc(sizeof(*f));
    f=new frame();
    f.data = []/*'reserved space '+*///frame_sizes[i];//frame_sizes[i];//'ne_alloc(frame_sizes[i])';
    f.length = frame_sizes[i];
	f.data={val:f.data};
    r = ne_io_read(ctx.io, f.data, frame_sizes[i]);f.data=f.data.val;
    if (r != 1) {
      //free(f.data);
	  f.data=null;
      //free(f);
	  f=null;
      nestegg_free_packet(pkt);
      return -1;
    }

    if (!last)
      pkt.frame = f;
    else
      last.next = f;
    last = f;
  }

  data[0] = pkt;

  return 1;
}

//ne_null_log_callback(nestegg * ctx, unsigned int severity, char const * fmt, ...)
function
ne_null_log_callback(ctx, severity, fmt, ppp) //todo fmt[ptr]?
{
  if (ctx && severity && fmt)
    return;
}

function //1354
ne_is_suspend_element(id)
{
  /* this could search the tree of elements for DESC_FLAG_SUSPEND */
  if (id == ID_SIMPLE_BLOCK || id == ID_BLOCK)
    return 1;
  return 0;
}

var ctx_=new nestegg();
//1410
function
nestegg_init(context, io, callback)
{
  var r=int_;
  var id=[0], version=[0], docversion=[uint64_t];
  var track;//*=new ebml_list_node()
  var doctype=[char_];//*
  var ctx = ctx_;//todo: null *

  if (!(io.read && io.seek && io.tell))
    return -1;

  //todo: ctx = ne_alloc(sizeof(ctx));//*

  //todo: ctx.io = ne_alloc(sizeof(*ctx->io));
  ctx.io = io;//*
//  ctx.log = callback;
  ctx.alloc_pool = ne_pool_init();

//  if (!ctx.log)
//    ctx.log = ne_null_log_callback;

  r = ne_peek_element(ctx, id, null);
  if (r != 1) {
    nestegg_destroy(ctx);
    return -1;
  }

  if (id[0] != ID_EBML) {
    nestegg_destroy(ctx);
    return -1;
  }

//  ctx.log(ctx, NESTEGG_LOG_DEBUG, "ctx %p", ctx);

  ne_ctx_push(ctx, ne_top_level_elements, ctx);

  r = ne_parse(ctx, null);

  if (r != 1) {
    nestegg_destroy(ctx);
    return -1;
  }

  if (ne_get_uint(ctx.ebml.ebml_read_version, version) != 0)
    version = 1;
  if (version[0] != 1) {
    nestegg_destroy(ctx);
    return -1;
  }

  if (ne_get_string(ctx.ebml.doctype, doctype) != 0)
    doctype[0] = "matroska";
  if (strcmp(doctype[0], "webm") != 0) {
    nestegg_destroy(ctx);
    return -1;
  }

  if (ne_get_uint(ctx.ebml.doctype_read_version, docversion) != 0)
    docversion[0] = 1;
  if (docversion[0] < 1 || docversion[0] > 2) {
    nestegg_destroy(ctx);
    return -1;
  }

  if (!ctx.segment.tracks.track_entry.head) {
    nestegg_destroy(ctx);
    return -1;
  }

  track = ctx.segment.tracks.track_entry.head;
  ctx.track_count = 0;

  while (track) {
    ctx.track_count += 1;
    track = track.next;
  }

  context[0]=ctx;

  return 0;
}

function //1494
nestegg_destroy(ctx)
{
	/*alert('todo:nestegg_destroy()');
	
  while (ctx->ancestor)
    ne_ctx_pop(ctx);
  ne_pool_destroy(ctx->alloc_pool);
  free(ctx->io);
  free(ctx);*/
}

function //1525
nestegg_track_count(ctx, tracks)
{
  tracks[0] = ctx.track_count;
  return 0;
}

function //1634
nestegg_track_type(ctx, track)
{
  //struct track_entry * entry;
  var type=[uint64_t];

  var entry = ne_find_track_entry(ctx, track);
  if (!entry)
    return -1;

  if (ne_get_uint(entry.type, type) != 0)
    return -1;

  if (type[0] & TRACK_TYPE_VIDEO)
    return NESTEGG_TRACK_VIDEO;

  if (type[0] & TRACK_TYPE_AUDIO)
    return NESTEGG_TRACK_AUDIO;

  return -1;
}

function //1656
nestegg_track_codec_id(ctx, track)
{
  var codec_id=[char_];//*
  //struct track_entry * entry;

  var entry = ne_find_track_entry(ctx, track);
  if (!entry)
    return -1;

  if (ne_get_string(entry.codec_id, codec_id) != 0)
    return -1;

  if (strcmp(codec_id[0], TRACK_ID_VP8) == 0)
    return NESTEGG_CODEC_VP8;

  if (strcmp(codec_id[0], TRACK_ID_VORBIS) == 0)
    return NESTEGG_CODEC_VORBIS;

  return -1;
}

function //1759
nestegg_track_video_params(ctx, track,
                           params)
{
  //struct track_entry * entry;
  var value=[uint64_t];

  //todo: memset(params, 0, sizeof(params));

  var entry = ne_find_track_entry(ctx, track);
  if (!entry)
    return -1;

  if (nestegg_track_type(ctx, track) != NESTEGG_TRACK_VIDEO)
    return -1;

  if (ne_get_uint(entry.video.pixel_width, value) != 0)
    return -1;
  params.width = value[0];

  if (ne_get_uint(entry.video.pixel_height, value) != 0)
    return -1;
  params.height = value[0];

  value[0] = 0;
  ne_get_uint(entry.video.pixel_crop_bottom, value);
  params.crop_bottom = value[0];

  value[0] = 0;
  ne_get_uint(entry.video.pixel_crop_top, value);
  params.crop_top = value[0];

  value[0] = 0;
  ne_get_uint(entry.video.pixel_crop_left, value);
  params.crop_left = value[0];

  value[0] = 0;
  ne_get_uint(entry.video.pixel_crop_right, value);
  params.crop_right = value[0];

  value[0] = params.width;
  ne_get_uint(entry.video.display_width, value);
  params.display_width = value[0];

  value[0] = params.height;
  ne_get_uint(entry.video.display_height, value);
  params.display_height = value[0];

  return 0;
}

function //1840
nestegg_read_packet(ctx, pkt)
{
  var r=int_;
  var id=[uint64_t], size=[uint64_t];

  pkt[0] = null;

  while(1) {//for (;;) {
    r = ne_peek_element(ctx, id, size);
    if (r != 1)
      return r;

    /* any suspend fields must be handled here */
    if (ne_is_suspend_element(id)) {
      r = ne_read_element(ctx, id, size);
      if (r != 1)
        return r;

      /* the only suspend fields are blocks and simple blocks, which we
         handle directly. */
      r = ne_read_block(ctx, id, size[0], pkt);
      return r;
    }

    r =  ne_parse(ctx, null);
    if (r != 1)
      return r;
  }

  return 1;
}

function //1873
nestegg_free_packet(pkt)
{
  var frame;//=new frame();//*

  while (pkt.frame) {
    frame = pkt.frame;
    pkt.frame = frame.next;
    //free(frame.data);
	frame.data='';
    //free(frame);
	frame='';
  }

 //free(pkt);
 pkt='';
}

function //1888
nestegg_packet_track(pkt, track)
{
  track[0] = pkt[0].track;//todo add 0, is this the best solution?
  return 0;
}

function //1902
nestegg_packet_count(pkt, count)
{
  var f = pkt[0].frame;//todo: best solution?? //*

  count[0] = 0;

  while (f) {
    count[0] += 1;
    f = f.next;
  }

  return 0;
}

function //1917
nestegg_packet_data(pkt, item_,
                    data, length) //todo: data_off???
{
  var f = pkt[0].frame;//todo: best solution??
  var count = 0;

  data[0] = null;
  length[0] = 0;

  while (f) {
    if (count == item_) {
      data[0] = f.data;//data_off???
      length[0] = f.length;
      return 0;
    }
    count += 1;
    f = f.next;
  }

  return -1;
}



var VPX_IMAGE_ABI_VERSION = (1); /**<\hideinitializer*/


var VPX_IMG_FMT_PLANAR     = 0x100;  /**< Image is a planar format */
var VPX_IMG_FMT_UV_FLIP    = 0x200;  /**< V plane precedes U plane in memory */
var VPX_IMG_FMT_HAS_ALPHA  = 0x400;  /**< Image has an alpha channel component */


    /*!\brief List of supported image formats */
var
        VPX_IMG_FMT_NONE=0,
        VPX_IMG_FMT_RGB24=1,   /**< 24 bit per pixel packed RGB */
        VPX_IMG_FMT_RGB32=2,   /**< 32 bit per pixel packed 0RGB */
        VPX_IMG_FMT_RGB565=3,  /**< 16 bit per pixel, 565 */
        VPX_IMG_FMT_RGB555=4,  /**< 16 bit per pixel, 555 */
        VPX_IMG_FMT_UYVY=5,    /**< UYVY packed YUV */
        VPX_IMG_FMT_YUY2=6,    /**< YUYV packed YUV */
        VPX_IMG_FMT_YVYU=7,    /**< YVYU packed YUV */
        VPX_IMG_FMT_BGR24=8,   /**< 24 bit per pixel packed BGR */
        VPX_IMG_FMT_RGB32_LE=9, /**< 32 bit packed BGR0 */
        VPX_IMG_FMT_ARGB=10,     /**< 32 bit packed ARGB, alpha=255 */
        VPX_IMG_FMT_ARGB_LE=11,  /**< 32 bit packed BGRA, alpha=255 */
        VPX_IMG_FMT_RGB565_LE=12,  /**< 16 bit per pixel, gggbbbbb rrrrrggg */
        VPX_IMG_FMT_RGB555_LE=13,  /**< 16 bit per pixel, gggbbbbb 0rrrrrgg */
        VPX_IMG_FMT_YV12    = VPX_IMG_FMT_PLANAR | VPX_IMG_FMT_UV_FLIP | 1, /**< planar YVU */
        VPX_IMG_FMT_I420    = VPX_IMG_FMT_PLANAR | 2,
        VPX_IMG_FMT_VPXYV12 = VPX_IMG_FMT_PLANAR | VPX_IMG_FMT_UV_FLIP | 3, /** < planar 4:2:0 format with vpx color space */
        VPX_IMG_FMT_VPXI420 = VPX_IMG_FMT_PLANAR | 4;   /** < planar 4:2:0 format with vpx color space */
    ; /**< alias for enum vpx_img_fmt */

//#if !defined(VPX_CODEC_DISABLE_COMPAT) || !VPX_CODEC_DISABLE_COMPAT
var IMG_FMT_PLANAR         = VPX_IMG_FMT_PLANAR;     /**< \deprecated Use #VPX_IMG_FMT_PLANAR */
var IMG_FMT_UV_FLIP        = VPX_IMG_FMT_UV_FLIP;    /**< \deprecated Use #VPX_IMG_FMT_UV_FLIP */
var IMG_FMT_HAS_ALPHA      = VPX_IMG_FMT_HAS_ALPHA;  /**< \deprecated Use #VPX_IMG_FMT_HAS_ALPHA */

    /*!\brief Deprecated list of supported image formats
     * \deprecated New code should use #vpx_img_fmt
     */
//var img_fmt   = vpx_img_fmt
    /*!\brief alias for enum img_fmt.
     * \deprecated New code should use #vpx_img_fmt_t
     */
//var img_fmt_t = vpx_img_fmt_t

var IMG_FMT_NONE       = VPX_IMG_FMT_NONE;       /**< \deprecated Use #VPX_IMG_FMT_NONE */
var IMG_FMT_RGB24      = VPX_IMG_FMT_RGB24;      /**< \deprecated Use #VPX_IMG_FMT_RGB24 */
var IMG_FMT_RGB32      = VPX_IMG_FMT_RGB32;      /**< \deprecated Use #VPX_IMG_FMT_RGB32 */
var IMG_FMT_RGB565     = VPX_IMG_FMT_RGB565;     /**< \deprecated Use #VPX_IMG_FMT_RGB565 */
var IMG_FMT_RGB555     = VPX_IMG_FMT_RGB555;     /**< \deprecated Use #VPX_IMG_FMT_RGB555 */
var IMG_FMT_UYVY       = VPX_IMG_FMT_UYVY;       /**< \deprecated Use #VPX_IMG_FMT_UYVY */
var IMG_FMT_YUY2       = VPX_IMG_FMT_YUY2;       /**< \deprecated Use #VPX_IMG_FMT_YUY2 */
var IMG_FMT_YVYU       = VPX_IMG_FMT_YVYU;       /**< \deprecated Use #VPX_IMG_FMT_YVYU */
var IMG_FMT_BGR24      = VPX_IMG_FMT_BGR24;      /**< \deprecated Use #VPX_IMG_FMT_BGR24 */
var IMG_FMT_RGB32_LE   = VPX_IMG_FMT_RGB32_LE;   /**< \deprecated Use #VPX_IMG_FMT_RGB32_LE */
var IMG_FMT_ARGB       = VPX_IMG_FMT_ARGB;       /**< \deprecated Use #VPX_IMG_FMT_ARGB */
var IMG_FMT_ARGB_LE    = VPX_IMG_FMT_ARGB_LE;    /**< \deprecated Use #VPX_IMG_FMT_ARGB_LE */
var IMG_FMT_RGB565_LE  = VPX_IMG_FMT_RGB565_LE;  /**< \deprecated Use #VPX_IMG_FMT_RGB565_LE */
var IMG_FMT_RGB555_LE  = VPX_IMG_FMT_RGB555_LE;  /**< \deprecated Use #VPX_IMG_FMT_RGB555_LE */
var IMG_FMT_YV12       = VPX_IMG_FMT_YV12;       /**< \deprecated Use #VPX_IMG_FMT_YV12 */
var IMG_FMT_I420       = VPX_IMG_FMT_I420;       /**< \deprecated Use #VPX_IMG_FMT_I420 */
var IMG_FMT_VPXYV12    = VPX_IMG_FMT_VPXYV12;    /**< \deprecated Use #VPX_IMG_FMT_VPXYV12 */
var IMG_FMT_VPXI420    = VPX_IMG_FMT_VPXI420;    /**< \deprecated Use #VPX_IMG_FMT_VPXI420 */
//#endif /* VPX_CODEC_DISABLE_COMPAT */




function img_alloc_helper(img,
                          fmt,
                          d_w,
                          d_h,
                          stride_align,
                          img_data)
{

    var h=int_, w=int_, s=int_, xcs=int_, ycs=int_, bps=int_;
    var align=int_;

    /* Treat align==0 like align==1 */
    if (!stride_align)
        stride_align = 1;

    /* Validate alignment (must be power of 2) */
    if (stride_align & (stride_align - 1))
        alert('goto fail');

    /* Get sample size for this format */
    switch (fmt)
    {
    case VPX_IMG_FMT_RGB32:
    case VPX_IMG_FMT_RGB32_LE:
    case VPX_IMG_FMT_ARGB:
    case VPX_IMG_FMT_ARGB_LE:
        bps = 32;
        break;
    case VPX_IMG_FMT_RGB24:
    case VPX_IMG_FMT_BGR24:
        bps = 24;
        break;
    case VPX_IMG_FMT_RGB565:
    case VPX_IMG_FMT_RGB565_LE:
    case VPX_IMG_FMT_RGB555:
    case VPX_IMG_FMT_RGB555_LE:
    case VPX_IMG_FMT_UYVY:
    case VPX_IMG_FMT_YUY2:
    case VPX_IMG_FMT_YVYU:
        bps = 16;
        break;
    case VPX_IMG_FMT_I420:
    case VPX_IMG_FMT_YV12:
    case VPX_IMG_FMT_VPXI420:
    case VPX_IMG_FMT_VPXYV12:
        bps = 12;
        break;
    default:
        bps = 16;
        break;
    }

    /* Get chroma shift values for this format */
    switch (fmt)
    {
    case VPX_IMG_FMT_I420:
    case VPX_IMG_FMT_YV12:
    case VPX_IMG_FMT_VPXI420:
    case VPX_IMG_FMT_VPXYV12:
        xcs = 1;
        break;
    default:
        xcs = 0;
        break;
    }

    switch (fmt)
    {
    case VPX_IMG_FMT_I420:
    case VPX_IMG_FMT_YV12:
    case VPX_IMG_FMT_VPXI420:
    case VPX_IMG_FMT_VPXYV12:
        ycs = 1;
        break;
    default:
        ycs = 0;
        break;
    }

    /* Calculate storage sizes given the chroma subsampling */
    align = (1 << xcs) - 1;
    w = (d_w + align) & ~align;
    align = (1 << ycs) - 1;
    h = (d_h + align) & ~align;
    s = (fmt & VPX_IMG_FMT_PLANAR) ? w : bps * w / 8;
    s = (s + stride_align - 1) & ~(stride_align - 1);

    /* Allocate the new image */
    if (!img)
    {
        img = new vpx_image_t();//(vpx_image_t *)calloc(1, sizeof(vpx_image_t));

        if (!img)
            alert('goto fail');

        img.self_allocd = 1;
    }
    else
    {
        //todo: memset(img, 0, sizeof(vpx_image_t));
    }

    img.img_data = img_data;

    if (!img_data)
    {
        img.img_data = malloc((fmt & VPX_IMG_FMT_PLANAR) ? h * w * bps / 8 : h * s,0);
        img.img_data_owner = 1;
    }

    if (!img.img_data)
        alert('goto fail');

    img.fmt = img["fmt"] = fmt;
    img.w = img["w"] = w;
    img.h = img["h"] = h;
    img.x_chroma_shift = img["x_chroma_shift"] = xcs;
    img.y_chroma_shift = img["y_chroma_shift"] = ycs;
    img.bps = img["bps"] = bps;

    /* Calculate strides */
    img.stride[VPX_PLANE_Y] = img.stride[VPX_PLANE_ALPHA] = s;
    img.stride[VPX_PLANE_U] = img.stride[VPX_PLANE_V] = s >> xcs;

    /* Default viewport to entire image */
    if (!vpx_img_set_rect(img, 0, 0, d_w, d_h))
        return img;

//fail:
    vpx_img_free(img);
    return null;
}

function vpx_img_alloc(img,
                       fmt,
                       d_w,
                       d_h,
                       stride_align)
{
    return img_alloc_helper(img, fmt, d_w, d_h, stride_align, null);
}

//vpx_image_t *vpx_img_wrap(vpx_image_t  *img,
//                          vpx_img_fmt_t fmt,
//                          unsigned int  d_w,
//                          unsigned int  d_h,
//                          unsigned int  stride_align,
//                          unsigned char       *img_data)
//{
//    return img_alloc_helper(img, fmt, d_w, d_h, stride_align, img_data);
//}

function vpx_img_set_rect(img,
                     x,
                     y,
                     w,
                     h)
{
    var data=char_;var data_off=0;

    if (x + w <= img.w && y + h <= img.h)
    {
        img.d_w = img["d_w"] = w;
        img.d_h = img["d_h"] = h;

        /* Calculate plane pointers */
        if (!(img.fmt & VPX_IMG_FMT_PLANAR))
        {
            img.planes[VPX_PLANE_PACKED] =
                img.img_data; img.img_data_of + parseInt(x * img.bps / 8 + y * img.stride[VPX_PLANE_PACKED],10);
        }
        else
        {
            data = img.img_data; data_off = img.img_data_off;

            if (img.fmt & VPX_IMG_FMT_HAS_ALPHA)
            {
                img.planes[VPX_PLANE_ALPHA] =
                    data;
				img.planes_off[VPX_PLANE_ALPHA] =
					data_off + x + y * img.stride[VPX_PLANE_ALPHA];
                data_off += img.h * img.stride[VPX_PLANE_ALPHA];
            }

            img.planes[VPX_PLANE_Y] = data; img.planes_off[VPX_PLANE_Y] = data_off + x + y * img.stride[VPX_PLANE_Y];
            data_off += img.h * img.stride[VPX_PLANE_Y];

            if (!(img.fmt & VPX_IMG_FMT_UV_FLIP))
            {
                img.planes[VPX_PLANE_U] = data;
				img.planes_off[VPX_PLANE_U] = data_off
                                       + (x >> img.x_chroma_shift)
                                       + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_U];
                data_off += (img.h >> img.y_chroma_shift) * img.stride[VPX_PLANE_U];
                img.planes[VPX_PLANE_V] = data;
                img.planes_off[VPX_PLANE_V] = data_off
                                       + (x >> img.x_chroma_shift)
                                       + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_V];
            }
            else
            {
                img.planes[VPX_PLANE_V] = data;
                img.planes_off[VPX_PLANE_V] = data_off
                                       + (x >> img.x_chroma_shift)
                                       + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_V];
                data_off += (img.h >> img.y_chroma_shift) * img.stride[VPX_PLANE_V];
                img.planes[VPX_PLANE_U] = data;
                img.planes_off[VPX_PLANE_U] = data_off
                                       + (x >> img.x_chroma_shift)
                                       + (y >> img.y_chroma_shift) * img.stride[VPX_PLANE_U];
            }
        }

        return 0;
    }

    return -1;
}

//void vpx_img_flip(vpx_image_t *img)
//{
//    /* Note: In the calculation pointer adjustment calculation, we want the
//     * rhs to be promoted to a signed type. Section 6.3.1.8 of the ISO C99
//     * standard indicates that if the adjustment parameter is unsigned, the
//     * stride parameter will be promoted to unsigned, causing errors when
//     * the lhs is a larger type than the rhs.
//     */
//    img->planes[VPX_PLANE_Y] += (signed)(img->d_h - 1) * img->stride[VPX_PLANE_Y];
//    img->stride[VPX_PLANE_Y] = -img->stride[VPX_PLANE_Y];
//
//    img->planes[VPX_PLANE_U] += (signed)((img->d_h >> img->y_chroma_shift) - 1)
//                            * img->stride[VPX_PLANE_U];
//    img->stride[VPX_PLANE_U] = -img->stride[VPX_PLANE_U];
//
//    img->planes[VPX_PLANE_V] += (signed)((img->d_h >> img->y_chroma_shift) - 1)
//                            * img->stride[VPX_PLANE_V];
//    img->stride[VPX_PLANE_V] = -img->stride[VPX_PLANE_V];
//
//    img->planes[VPX_PLANE_ALPHA] += (signed)(img->d_h - 1) * img->stride[VPX_PLANE_ALPHA];
//    img->stride[VPX_PLANE_ALPHA] = -img->stride[VPX_PLANE_ALPHA];
//}
//
function vpx_img_free(img)
{
    if (img)
    {
        if (img.img_data && img.img_data_owner)
            img.img_data='';//free(img.img_data);

        if (img.self_allocd)
            img='';//free(img);
    }
}



//15
var bool_decoder = function()
{
    this.input=char_,// *     /* next compressed data byte */
    this.input_off=0,// *     /* next compressed data byte */
    this.input_len=size_t,    /* length of the input buffer */
    this.range=int_,          /* identical to encoder's range */
    this.value=int_,          /* contains at least 8 significant
                          * bits */
    this.bit_count=int_       /* # of bits shifted out of value,
                          * max 7 */
};


//27
function
init_bool_decoder(d,
                  start_partition,
                  start_partition_off,
                  sz)
{
    if (sz >= 2)
    {
        d.value = (start_partition[start_partition_off+0] << 8) /* first 2 input bytes */
                   | start_partition[start_partition_off+1];
        d.input = start_partition; d.input_off = start_partition_off + 2;      /* ptr to next byte */
        d.input_len = sz - 2;
    }
    else
    {
        d.value = 0;
        d.input = null;
        d.input_len = 0;
    }

    d.range = 255;    /* initial range is full */
    d.bit_count = 0;  /* have not yet shifted out any bits */
}


function bool_get(d, probability)
{
    /* range and split are identical to the corresponding values
       used by the encoder when this bool was written */

    var  splitt = 1 + (((d.range - 1) * probability) >> 8);
    var  SPLIT = splitt << 8;
    var  retval=int_;           /* will be 0 or 1 */

    if (d.value >= SPLIT)    /* encoded a one */
    {
        retval = 1;
        d.range -= splitt;  /* reduce range */
        d.value -= SPLIT;  /* subtract off left endpoint of interval */
    }
    else                  /* encoded a zero */
    {
        retval = 0;
        d.range = splitt; /* reduce range, no change in left endpoint */
    }

    while (d.range < 128)    /* shift out irrelevant value bits */
    {
        d.value <<= 1;
        d.range <<= 1;

        if (++d.bit_count == 8)    /* shift in new bits 8 at a time */
        {
            d.bit_count = 0;

            if (d.input_len)
            {
                d.value |= d.input[d.input_off++];
                d.input_len--;
            }
        }
    }

    return retval;
}


function bool_get_bit(br)
{
    return bool_get(br, 128);
}


function bool_get_uint(br, bits)
{
    var z = 0;
    var bit=int_;

    for (bit = bits - 1; bit >= 0; bit--)
    {
        z |= (bool_get_bit(br) << bit);
    }

    return z;
}


function bool_get_int(br, bits)
{
    var z = 0;
    var bit=int_;

    for (bit = bits - 1; bit >= 0; bit--)
    {
        z |= (bool_get_bit(br) << bit);
    }

    return bool_get_bit(br) ? -z : z;
}


function bool_maybe_get_int(br, bits)
{
    return bool_get_bit(br) ? bool_get_int(br, bits) : 0;
}


//133
function
bool_read_tree(bool,
               t,
               p,
               p_off)
{
    var i = 0;

	if(typeof p_off!=='undefined')
    while ((i = t[ i + bool_get(bool, p[p_off +(i>>1)])]) > 0) ;
	else
    while ((i = t[ i + bool_get(bool, p[i>>1])]) > 0) ;

    return -i;
}


/* Evaluates to a mask with n bits set */
function BITS_MASK(n) { return ((1<<(n))-1) }

/* Returns len bits, with the LSB at position bit */
function BITS_GET(val, bit, len) { return (((val)>>(bit))&BITS_MASK(len)) }




var vp8_frame_hdr = function()
{
    this.is_keyframe=int_,      /* Frame is a keyframe */
    this.is_experimental=int_,  /* Frame is a keyframe */
    this.version=int_,          /* Bitstream version */
    this.is_shown=int_,         /* Frame is to be displayed. */
    this.part0_sz=int_,         /* Partition 0 length, in bytes */

    this.kf=new Object(//vp8_kf_hdr:
    {
        w:int_,        /* Width */
        h:int_,        /* Height */
        scale_w:int_,  /* Scaling factor, Width */
        scale_h:int_   /* Scaling factor, Height */
    }),// kf;

    this.frame_size_updated=int_ /* Flag to indicate a resolution
                                      * update.
                                      */
};


var
    MB_FEATURE_TREE_PROBS = 3,
    MAX_MB_SEGMENTS = 4
;


var vp8_segment_hdr = function()
{
    this.enabled=int_,
    this.update_data=int_,
    this.update_map=int_,
    this.abs_=int_,    /* 0=deltas, 1=absolute values */
    this.tree_probs=new Array(MB_FEATURE_TREE_PROBS),//,int_),
    this.lf_level=new Array(MAX_MB_SEGMENTS),//,int_),
    this.quant_idx=new Array(MAX_MB_SEGMENTS)//,int_)
};


var
    BLOCK_CONTEXTS = 4
;


var vp8_loopfilter_hdr = function()
{
    this.use_simple=int_,
    this.level=int_,
    this.sharpness=int_,
    this.delta_enabled=int_,
    this.ref_delta=new Array(BLOCK_CONTEXTS),//,int_),
    this.mode_delta=new Array(BLOCK_CONTEXTS)//,int_)
};


var
    MAX_PARTITIONS = 8
;

var vp8_token_hdr = function()
{
    this.partitions=int_,
    this.partition_sz=new Array(MAX_PARTITIONS)//,int_)
};


var vp8_quant_hdr = function()
{
    this.q_index=int_,
    this.delta_update=int_,
    this.y1_dc_delta_q=int_,
    this.y2_dc_delta_q=int_,
    this.y2_ac_delta_q=int_,
    this.uv_dc_delta_q=int_,
    this.uv_ac_delta_q=int_
};


var vp8_reference_hdr = function()
{
    this.refresh_last=int_,
    this.refresh_gf=int_,
    this.refresh_arf=int_,
    this.copy_gf=int_,
    this.copy_arf=int_,
    this.sign_bias=new Array(4),//,int_),
    this.refresh_entropy=int_
};


var
    BLOCK_TYPES        = 4,
    PREV_COEF_CONTEXTS = 3,
    COEF_BANDS         = 8,
    ENTROPY_NODES      = 11
;
var coeff_probs_table_t=function() {return ArrM(new Array(BLOCK_TYPES,COEF_BANDS,
PREV_COEF_CONTEXTS,
ENTROPY_NODES),char_);}


var
    MV_PROB_CNT = 2 + 8 - 1 + 10 /* from entropymv.h */
;
var mv_component_probs_t=function(){return new Array(MV_PROB_CNT)};//,char_);

var Arr_1056=Arr(1056,0);
var vp8_entropy_hdr = function()
{
    this.coeff_probs=new coeff_probs_table_t(),
    this.coeff_probs_=Arr(1056,0),//Arr_1056,
    this.mv_probs=Arr_new(2,mv_component_probs_t),
    this.coeff_skip_enabled=int_,
    this.coeff_skip_prob=char_,
    this.y_mode_probs=new Array(0,0,0,0),//4,char_
    this.uv_mode_probs=new Array(0,0,0),//3,char_
    this.prob_inter=char_,
    this.prob_last=char_,
    this.prob_gf=char_
};


var
    CURRENT_FRAME=0,
    LAST_FRAME=1,
    GOLDEN_FRAME=2,
    ALTREF_FRAME=3,
    NUM_REF_FRAMES=4
;


var filter_t=function() {return new Array(6);}//,short_


var mv = function()
{
    this.d=
    {
        x:int16_t, y:int16_t
    }
    //uint32_t               raw;
};// mv_t;


var mb_base_info = function()
{
    this.y_mode     	= char_,//4;
    this.uv_mode    	= char_,//4;
    this.segment_id 	= char_,//2;
    this.ref_frame  	= char_,//2;
    this.skip_coeff 	= char_,//1;
    this.need_mc_border = char_,//1;
    this.partitioning 	= null,//2;'enum splitmv_partitioning'
    this.mv				=new mv(),
    this.eob_mask		=int_
};


var mb_info = function()
{
    this.base  =new mb_base_info(),
    this.splitt=new Object(
    {
        mvs:Arr_new(16,mv),
        modes:new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)//16,'todo:enum prediction_mode')
    })
};


/* A "token entropy context" has 4 Y values, 2 U, 2 V, and 1 Y2 */
var token_entropy_ctx_t=function() {return new Array(4 + 2 + 2 + 1);}//Arr,int_

var token_decoder = function()
{
    this.bool					=new bool_decoder(),
    this.left_token_entropy_ctx	=new token_entropy_ctx_t(),
    this.coeffs					=short_//*
};

var
    TOKEN_BLOCK_Y1=0,
    TOKEN_BLOCK_UV=1,
    TOKEN_BLOCK_Y2=2,
    TOKEN_BLOCK_TYPES=3
;

var dequant_factors = function()
{
    this.quant_idx	=int_,
    this.factor		=ArrM(new Array(TOKEN_BLOCK_TYPES,2),short_) /* [ Y1, UV, Y2 ] [ DC, AC ] */
};


var ref_cnt_img = function()
{
    this.img			=new vpx_image_t(),
    this.ref_cnt		=int_
};


var vp8_decoder_ctx = function()
{
    this.error=[],//todo: newObjectI(vpx_internal_error_info),
    this.frame_cnt=int_,

    this.frame_hdr=			new vp8_frame_hdr(),
    this.segment_hdr=		new vp8_segment_hdr(),
    this.loopfilter_hdr=	new vp8_loopfilter_hdr(),
    this.token_hdr=			new vp8_token_hdr(),
    this.quant_hdr=			new vp8_quant_hdr(),
    this.reference_hdr=		new vp8_reference_hdr(),
    this.entropy_hdr=		new vp8_entropy_hdr(),

    this.saved_entropy=		new vp8_entropy_hdr(),
    this.saved_entropy_valid=int_,

    this.mb_rows=int_,
    this.mb_cols=int_,
    this.mb_info_storage				=null,//*
    this.mb_info_storage_off			=0,
    this.mb_info_storage_object			=(mb_info),//new 

    this.mb_info_rows_storage			=null,//**
    this.mb_info_rows_storage_off		=0,
    this.mb_info_rows_storage_object	=(mb_info),//new 
    this.mb_info_rows					=null,//mb_info**
    this.mb_info_rows_off				=0,

    this.above_token_entropy_ctx			=null,//*'token_entropy_ctx_t'
    this.above_token_entropy_ctx_object	=(token_entropy_ctx_t),//*
    this.tokens							=Arr_new(MAX_PARTITIONS,token_decoder),
    this.dequant_factors					=Arr_new(MAX_MB_SEGMENTS,dequant_factors),

    this.frame_strg						=Arr_new(NUM_REF_FRAMES,ref_cnt_img),
    this.ref_frames						=Arr_new(NUM_REF_FRAMES,ref_cnt_img),//*
    this.ref_frame_offsets				=new Array(0,0,0,0),//4,ptrdiff_t
    this.ref_frame_offsets_				=new Array(0,0,0,0),//4,ptrdiff_t

    this.subpixel_filters				=new filter_t()//*
};


//306
function CLAMP_255(x) { return (x<0?0:x>255?255:x) }//{ return ((x)<0?0:((x)>255?255:(x))) }



//14
function
vp8_dixie_walsh(input, input_off, output, output_off)
{
    var i=int_;
    var a1=int_, b1=int_, c1=int_, d1=int_;
    var a2=int_, b2=int_, c2=int_, d2=int_;
    var ip = input; var ip_off = input_off;
    var op = output; var op_off = output_off;

    for (i = 0; i < 4; i++)
    {
        a1 = ip[ip_off+ 0] + ip[ip_off+ 12];
        b1 = ip[ip_off+ 4] + ip[ip_off+ 8];
        c1 = ip[ip_off+ 4] - ip[ip_off+ 8];
        d1 = ip[ip_off+ 0] - ip[ip_off+ 12];

        op[op_off+ 0] = a1 + b1;
        op[op_off+ 4] = c1 + d1;
        op[op_off+ 8] = a1 - b1;
        op[op_off+ 12] = d1 - c1;
        ip_off++;
        op_off++;
    }

    ip = output; ip_off = output_off;
    op = output; op_off = output_off;

    for (i = 0; i < 4; i++)
    {
        a1 = ip[ip_off+ 0] + ip[ip_off+ 3];
        b1 = ip[ip_off+ 1] + ip[ip_off+ 2];
        c1 = ip[ip_off+ 1] - ip[ip_off+ 2];
        d1 = ip[ip_off+ 0] - ip[ip_off+ 3];

        a2 = a1 + b1;
        b2 = c1 + d1;
        c2 = a1 - b1;
        d2 = d1 - c1;

        op[op_off+ 0] = (a2 + 3) >> 3;
        op[op_off+ 1] = (b2 + 3) >> 3;
        op[op_off+ 2] = (c2 + 3) >> 3;
        op[op_off+ 3] = (d2 + 3) >> 3;

        ip_off += 4;
        op_off += 4;
    }
}


var cospi8sqrt2minus1 = 20091;
var sinpi8sqrt2       = 35468;
/*var rounding          = 0;*/
//67
function
idct_columns(input, input_off, output, output_off)
{
    var i=int_;
    var a1=int_, b1=int_, c1=int_, d1=int_;

    var ip = input; var ip_off = input_off;
    var op = output; var op_off = output_off;
    var temp1=int_, temp2=int_;
    var shortpitch = 4;

    for (i = 0; i < 4; i++)
    {
        a1 = ip[ip_off+ 0] + ip[ip_off+ 8];
        b1 = ip[ip_off+ 0] - ip[ip_off+ 8];

        temp1 = (ip[ip_off+ 4] * sinpi8sqrt2/* + rounding */) >> 16;
        temp2 = ip[ip_off+ 12] +
            ((ip[ip_off+ 12] * cospi8sqrt2minus1/* + rounding */) >> 16);
        c1 = temp1 - temp2;

        temp1 = ip[ip_off+ 4] +
            ((ip[ip_off+ 4] * cospi8sqrt2minus1/* + rounding */) >> 16);
        temp2 = (ip[ip_off+ 12] * sinpi8sqrt2/* + rounding */) >> 16;
        d1 = temp1 + temp2;

        op[op_off+ shortpitch*0] = a1 + d1;
        op[op_off+ shortpitch*3] = a1 - d1;

        op[op_off+ shortpitch*1] = b1 + c1;
        op[op_off+ shortpitch*2] = b1 - c1;

        ip_off++;
        op_off++;
    }
}

var tmp_2=Arr(16,0);
//105
function
vp8_dixie_idct_add(recon,
				   recon_off,
                   predict,
				   predict_off,
                   stride,
                   coeffs,
				   coeffs_off)
{
    var i=int_;
    var a1=int_, b1=int_, c1=int_, d1=int_, temp1=int_, temp2=int_;
    /*Arr(16,short_);*/ var tmp_off=0;

    idct_columns(coeffs, coeffs_off, tmp_2, tmp_off);
    coeffs = tmp_2; coeffs_off = tmp_off;//todo: pinter tmp coeffs?

    for (i = 0; i < 4; i++)
    {
        a1 = coeffs[coeffs_off+ 0] + coeffs[coeffs_off+ 2];
        b1 = coeffs[coeffs_off+ 0] - coeffs[coeffs_off+ 2];

        temp1 = (coeffs[coeffs_off+ 1] * sinpi8sqrt2/* + rounding */) >> 16;
        temp2 = coeffs[coeffs_off+ 3] +
            ((coeffs[coeffs_off+ 3] * cospi8sqrt2minus1/* + rounding */) >> 16);
        c1 = temp1 - temp2;

        temp1 = coeffs[coeffs_off+ 1] +
            ((coeffs[coeffs_off+ 1] * cospi8sqrt2minus1/* + rounding */) >> 16);
        temp2 = (coeffs[coeffs_off+ 3] * sinpi8sqrt2/* + rounding */) >> 16;
        d1 = temp1 + temp2;

        recon[recon_off+ 0] = (predict[predict_off+ 0] + ((a1 + d1 + 4) >> 3));//CLAMP_255
        recon[recon_off+ 3] = (predict[predict_off+ 3] + ((a1 - d1 + 4) >> 3));//CLAMP_255
        recon[recon_off+ 1] = (predict[predict_off+ 1] + ((b1 + c1 + 4) >> 3));//CLAMP_255
        recon[recon_off+ 2] = (predict[predict_off+ 2] + ((b1 - c1 + 4) >> 3));//CLAMP_255

        coeffs_off += 4;
        recon_off += stride;
        predict_off += stride;
    }
}


var k_coeff_entropy_update_probs =
new Array(
    new Array(
        new Array(
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(176, 246, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(223, 241, 252, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(249, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 244, 252, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(234, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 246, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(239, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(251, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(251, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 254, 253, 255, 254, 255, 255, 255, 255, 255, 255 ),
            new Array(250, 255, 254, 255, 254, 255, 255, 255, 255, 255, 255 ),
            new Array(254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        )
    ),
    new Array(
        new Array(
            new Array(217, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(225, 252, 241, 253, 255, 255, 254, 255, 255, 255, 255 ),
            new Array(234, 250, 241, 250, 253, 255, 253, 254, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(223, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(238, 253, 254, 254, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(249, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 253, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(247, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(252, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        )
    ),
    new Array(
        new Array(
            new Array(186, 251, 250, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(234, 251, 244, 254, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(251, 251, 243, 253, 254, 255, 254, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(236, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(251, 253, 253, 254, 254, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        )
    ),
    new Array(
        new Array(
            new Array(248, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(250, 254, 252, 254, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(248, 254, 249, 253, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(246, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(252, 254, 251, 254, 254, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 254, 252, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(248, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(253, 255, 254, 254, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(245, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(253, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 251, 253, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(252, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 252, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(249, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 255, 253, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        ),
        new Array(
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 ),
            new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255 )
        )
    )
);


var k_default_y_mode_probs         =
new Array( 112,  86, 140,  37);


var k_default_uv_mode_probs        =
new Array( 162, 101, 204);


var k_default_coeff_probs          =
new Array(
    new Array( /* block type 0 */
        new Array( /* coeff band 0 */
            new Array( 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128),
            new Array( 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128),
            new Array( 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128)
        ),
        new Array( /* coeff band 1 */
            new Array( 253, 136, 254, 255, 228, 219, 128, 128, 128, 128, 128),
            new Array( 189, 129, 242, 255, 227, 213, 255, 219, 128, 128, 128),
            new Array( 106, 126, 227, 252, 214, 209, 255, 255, 128, 128, 128)
        ),
        new Array( /* coeff band 2 */
            new Array(   1,  98, 248, 255, 236, 226, 255, 255, 128, 128, 128),
            new Array( 181, 133, 238, 254, 221, 234, 255, 154, 128, 128, 128),
            new Array(  78, 134, 202, 247, 198, 180, 255, 219, 128, 128, 128)
        ),
        new Array( /* coeff band 3 */
            new Array(   1, 185, 249, 255, 243, 255, 128, 128, 128, 128, 128),
            new Array( 184, 150, 247, 255, 236, 224, 128, 128, 128, 128, 128),
            new Array(  77, 110, 216, 255, 236, 230, 128, 128, 128, 128, 128)
        ),
        new Array( /* coeff band 4 */
            new Array(   1, 101, 251, 255, 241, 255, 128, 128, 128, 128, 128),
            new Array( 170, 139, 241, 252, 236, 209, 255, 255, 128, 128, 128),
            new Array(  37, 116, 196, 243, 228, 255, 255, 255, 128, 128, 128)
        ),
        new Array( /* coeff band 5 */
            new Array(   1, 204, 254, 255, 245, 255, 128, 128, 128, 128, 128),
            new Array( 207, 160, 250, 255, 238, 128, 128, 128, 128, 128, 128),
            new Array( 102, 103, 231, 255, 211, 171, 128, 128, 128, 128, 128)
        ),
        new Array( /* coeff band 6 */
            new Array(   1, 152, 252, 255, 240, 255, 128, 128, 128, 128, 128),
            new Array( 177, 135, 243, 255, 234, 225, 128, 128, 128, 128, 128),
            new Array(  80, 129, 211, 255, 194, 224, 128, 128, 128, 128, 128)
        ),
        new Array( /* coeff band 7 */
            new Array(   1,   1, 255, 128, 128, 128, 128, 128, 128, 128, 128),
            new Array( 246,   1, 255, 128, 128, 128, 128, 128, 128, 128, 128),
            new Array( 255, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128)
        )
    ),
    new Array( /* block type 1 */
        new Array( /* coeff band 0 */
            new Array( 198,  35, 237, 223, 193, 187, 162, 160, 145, 155,  62),
            new Array( 131,  45, 198, 221, 172, 176, 220, 157, 252, 221,   1),
            new Array(  68,  47, 146, 208, 149, 167, 221, 162, 255, 223, 128)
        ),
        new Array( /* coeff band 1 */
            new Array(   1, 149, 241, 255, 221, 224, 255, 255, 128, 128, 128),
            new Array( 184, 141, 234, 253, 222, 220, 255, 199, 128, 128, 128),
            new Array(  81,  99, 181, 242, 176, 190, 249, 202, 255, 255, 128)
        ),
        new Array( /* coeff band 2 */
            new Array(   1, 129, 232, 253, 214, 197, 242, 196, 255, 255, 128),
            new Array(  99, 121, 210, 250, 201, 198, 255, 202, 128, 128, 128),
            new Array(  23,  91, 163, 242, 170, 187, 247, 210, 255, 255, 128)
        ),
        new Array( /* coeff band 3 */
            new Array(   1, 200, 246, 255, 234, 255, 128, 128, 128, 128, 128),
            new Array( 109, 178, 241, 255, 231, 245, 255, 255, 128, 128, 128),
            new Array(  44, 130, 201, 253, 205, 192, 255, 255, 128, 128, 128)
        ),
        new Array( /* coeff band 4 */
            new Array(   1, 132, 239, 251, 219, 209, 255, 165, 128, 128, 128),
            new Array(  94, 136, 225, 251, 218, 190, 255, 255, 128, 128, 128),
            new Array(  22, 100, 174, 245, 186, 161, 255, 199, 128, 128, 128)
        ),
        new Array( /* coeff band 5 */
            new Array(   1, 182, 249, 255, 232, 235, 128, 128, 128, 128, 128),
            new Array( 124, 143, 241, 255, 227, 234, 128, 128, 128, 128, 128),
            new Array(  35,  77, 181, 251, 193, 211, 255, 205, 128, 128, 128)
        ),
        new Array( /* coeff band 6 */
            new Array(   1, 157, 247, 255, 236, 231, 255, 255, 128, 128, 128),
            new Array( 121, 141, 235, 255, 225, 227, 255, 255, 128, 128, 128),
            new Array(  45,  99, 188, 251, 195, 217, 255, 224, 128, 128, 128)
        ),
        new Array( /* coeff band 7 */
            new Array(   1,   1, 251, 255, 213, 255, 128, 128, 128, 128, 128),
            new Array( 203,   1, 248, 255, 255, 128, 128, 128, 128, 128, 128),
            new Array( 137,   1, 177, 255, 224, 255, 128, 128, 128, 128, 128)
        )
    ),
    new Array( /* block type 2 */
        new Array( /* coeff band 0 */
            new Array( 253,   9, 248, 251, 207, 208, 255, 192, 128, 128, 128),
            new Array( 175,  13, 224, 243, 193, 185, 249, 198, 255, 255, 128),
            new Array(  73,  17, 171, 221, 161, 179, 236, 167, 255, 234, 128)
        ),
        new Array( /* coeff band 1 */
            new Array(   1,  95, 247, 253, 212, 183, 255, 255, 128, 128, 128),
            new Array( 239,  90, 244, 250, 211, 209, 255, 255, 128, 128, 128),
            new Array( 155,  77, 195, 248, 188, 195, 255, 255, 128, 128, 128)
        ),
        new Array( /* coeff band 2 */
            new Array(   1,  24, 239, 251, 218, 219, 255, 205, 128, 128, 128),
            new Array( 201,  51, 219, 255, 196, 186, 128, 128, 128, 128, 128),
            new Array(  69,  46, 190, 239, 201, 218, 255, 228, 128, 128, 128)
        ),
        new Array( /* coeff band 3 */
            new Array(   1, 191, 251, 255, 255, 128, 128, 128, 128, 128, 128),
            new Array( 223, 165, 249, 255, 213, 255, 128, 128, 128, 128, 128),
            new Array( 141, 124, 248, 255, 255, 128, 128, 128, 128, 128, 128)
        ),
        new Array( /* coeff band 4 */
            new Array(   1,  16, 248, 255, 255, 128, 128, 128, 128, 128, 128),
            new Array( 190,  36, 230, 255, 236, 255, 128, 128, 128, 128, 128),
            new Array( 149,   1, 255, 128, 128, 128, 128, 128, 128, 128, 128)
        ),
        new Array( /* coeff band 5 */
            new Array(   1, 226, 255, 128, 128, 128, 128, 128, 128, 128, 128),
            new Array( 247, 192, 255, 128, 128, 128, 128, 128, 128, 128, 128),
            new Array( 240, 128, 255, 128, 128, 128, 128, 128, 128, 128, 128)
        ),
        new Array( /* coeff band 6 */
            new Array(   1, 134, 252, 255, 255, 128, 128, 128, 128, 128, 128),
            new Array( 213,  62, 250, 255, 255, 128, 128, 128, 128, 128, 128),
            new Array(  55,  93, 255, 128, 128, 128, 128, 128, 128, 128, 128)
        ),
        new Array( /* coeff band 7 */
            new Array( 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128),
            new Array( 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128),
            new Array( 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128)
        )
    ),
    new Array( /* block type 3 */
        new Array( /* coeff band 0 */
            new Array( 202,  24, 213, 235, 186, 191, 220, 160, 240, 175, 255),
            new Array( 126,  38, 182, 232, 169, 184, 228, 174, 255, 187, 128),
            new Array(  61,  46, 138, 219, 151, 178, 240, 170, 255, 216, 128)
        ),
        new Array( /* coeff band 1 */
            new Array(   1, 112, 230, 250, 199, 191, 247, 159, 255, 255, 128),
            new Array( 166, 109, 228, 252, 211, 215, 255, 174, 128, 128, 128),
            new Array(  39,  77, 162, 232, 172, 180, 245, 178, 255, 255, 128)
        ),
        new Array( /* coeff band 2 */
            new Array(   1,  52, 220, 246, 198, 199, 249, 220, 255, 255, 128),
            new Array( 124,  74, 191, 243, 183, 193, 250, 221, 255, 255, 128),
            new Array(  24,  71, 130, 219, 154, 170, 243, 182, 255, 255, 128)
        ),
        new Array( /* coeff band 3 */
            new Array(   1, 182, 225, 249, 219, 240, 255, 224, 128, 128, 128),
            new Array( 149, 150, 226, 252, 216, 205, 255, 171, 128, 128, 128),
            new Array(  28, 108, 170, 242, 183, 194, 254, 223, 255, 255, 128)
        ),
        new Array( /* coeff band 4 */
            new Array(   1,  81, 230, 252, 204, 203, 255, 192, 128, 128, 128),
            new Array( 123, 102, 209, 247, 188, 196, 255, 233, 128, 128, 128),
            new Array(  20,  95, 153, 243, 164, 173, 255, 203, 128, 128, 128)
        ),
        new Array( /* coeff band 5 */
            new Array(   1, 222, 248, 255, 216, 213, 128, 128, 128, 128, 128),
            new Array( 168, 175, 246, 252, 235, 205, 255, 255, 128, 128, 128),
            new Array(  47, 116, 215, 255, 211, 212, 255, 255, 128, 128, 128)
        ),
        new Array( /* coeff band 6 */
            new Array(   1, 121, 236, 253, 212, 214, 255, 255, 128, 128, 128),
            new Array( 141,  84, 213, 252, 201, 202, 255, 219, 128, 128, 128),
            new Array(  42,  80, 160, 240, 162, 185, 255, 205, 128, 128, 128)
        ),
        new Array( /* coeff band 7 */
            new Array(   1,   1, 255, 128, 128, 128, 128, 128, 128, 128, 128),
            new Array( 244,   1, 255, 128, 128, 128, 128, 128, 128, 128, 128),
            new Array( 238,   1, 255, 128, 128, 128, 128, 128, 128, 128, 128)
        )
    )
);


var k_mv_entropy_update_probs =
new Array(
    new Array(
        237,
        246,
        253, 253, 254, 254, 254, 254, 254,
        254, 254, 254, 254, 254, 250, 250, 252, 254, 254
    ),
    new Array(
        231,
        243,
        245, 253, 254, 254, 254, 254, 254,
        254, 254, 254, 254, 254, 251, 251, 254, 254, 254
    )
);


var k_default_mv_probs = function() {
return new Array(
    new Array(                                                    /* row */
        162,                                             /* is short */
        128,                                             /* sign */
        225, 146, 172, 147, 214,  39, 156,              /* short tree */
        128, 129, 132,  75, 145, 178, 206, 239, 254, 254 /* long bits */
    ),
    new Array(
        164,
        128,
        204, 170, 119, 235, 140, 230, 228,
        128, 130, 130,  74, 148, 180, 203, 236, 254, 254

    )
)
};


var dc_q_lookup =
new Array(
    4,    5,    6,    7,    8,    9,    10,   10,
    11,   12,   13,   14,   15,   16,   17,   17,
    18,   19,   20,   20,   21,   21,   22,   22,
    23,   23,   24,   25,   25,   26,   27,   28,
    29,   30,   31,   32,   33,   34,   35,   36,
    37,   37,   38,   39,   40,   41,   42,   43,
    44,   45,   46,   46,   47,   48,   49,   50,
    51,   52,   53,   54,   55,   56,   57,   58,
    59,   60,   61,   62,   63,   64,   65,   66,
    67,   68,   69,   70,   71,   72,   73,   74,
    75,   76,   76,   77,   78,   79,   80,   81,
    82,   83,   84,   85,   86,   87,   88,   89,
    91,   93,   95,   96,   98,   100,  101,  102,
    104,  106,  108,  110,  112,  114,  116,  118,
    122,  124,  126,  128,  130,  132,  134,  136,
    138,  140,  143,  145,  148,  151,  154,  157
);
var ac_q_lookup =
new Array(
    4,    5,    6,    7,    8,    9,    10,   11,
    12,   13,   14,   15,   16,   17,   18,   19,
    20,   21,   22,   23,   24,   25,   26,   27,
    28,   29,   30,   31,   32,   33,   34,   35,
    36,   37,   38,   39,   40,   41,   42,   43,
    44,   45,   46,   47,   48,   49,   50,   51,
    52,   53,   54,   55,   56,   57,   58,   60,
    62,   64,   66,   68,   70,   72,   74,   76,
    78,   80,   82,   84,   86,   88,   90,   92,
    94,   96,   98,   100,  102,  104,  106,  108,
    110,  112,  114,  116,  119,  122,  125,  128,
    131,  134,  137,  140,  143,  146,  149,  152,
    155,  158,  161,  164,  167,  170,  173,  177,
    181,  185,  189,  193,  197,  201,  205,  209,
    213,  217,  221,  225,  229,  234,  239,  245,
    249,  254,  259,  264,  269,  274,  279,  284
);


var kf_y_mode_probs  = new Array( 145, 156, 163, 128);
var kf_uv_mode_probs = new Array( 142, 114, 183);
var kf_b_mode_probs =
new Array(
  new Array( /* above mode 0 */
    new Array( /* left mode 0 */ 231, 120,  48,  89, 115, 113, 120, 152, 112),
    new Array( /* left mode 1 */ 152, 179,  64, 126, 170, 118,  46,  70,  95),
    new Array( /* left mode 2 */ 175,  69, 143,  80,  85,  82,  72, 155, 103),
    new Array( /* left mode 3 */  56,  58,  10, 171, 218, 189,  17,  13, 152),
    new Array( /* left mode 4 */ 144,  71,  10,  38, 171, 213, 144,  34,  26),
    new Array( /* left mode 5 */ 114,  26,  17, 163,  44, 195,  21,  10, 173),
    new Array( /* left mode 6 */ 121,  24,  80, 195,  26,  62,  44,  64,  85),
    new Array( /* left mode 7 */ 170,  46,  55,  19, 136, 160,  33, 206,  71),
    new Array( /* left mode 8 */  63,  20, 8, 114, 114, 208,  12,   9, 226),
    new Array( /* left mode 9 */  81,  40,  11,  96, 182,  84,  29,  16,  36)
  ),
  new Array( /* above mode 1 */
    new Array( /* left mode 0 */ 134, 183,  89, 137,  98, 101, 106, 165, 148),
    new Array( /* left mode 1 */  72, 187, 100, 130, 157, 111,  32,  75,  80),
    new Array( /* left mode 2 */  66, 102, 167,  99,  74,  62,  40, 234, 128),
    new Array( /* left mode 3 */  41,  53, 9, 178, 241, 141,  26,   8, 107),
    new Array( /* left mode 4 */ 104,  79,  12,  27, 217, 255,  87,  17,   7),
    new Array( /* left mode 5 */  74,  43,  26, 146,  73, 166,  49,  23, 157),
    new Array( /* left mode 6 */  65,  38, 105, 160,  51,  52,  31, 115, 128),
    new Array( /* left mode 7 */  87,  68,  71,  44, 114,  51,  15, 186,  23),
    new Array( /* left mode 8 */  47,  41,  14, 110, 182, 183,  21,  17, 194),
    new Array( /* left mode 9 */  66,  45,  25, 102, 197, 189,  23,  18,  22)
  ),
  new Array( /* above mode 2 */
    new Array( /* left mode 0 */  88,  88, 147, 150,  42,  46,  45, 196, 205),
    new Array( /* left mode 1 */  43,  97, 183, 117,  85,  38,  35, 179,  61),
    new Array( /* left mode 2 */  39,  53, 200,  87,  26,  21,  43, 232, 171),
    new Array( /* left mode 3 */  56,  34,  51, 104, 114, 102,  29,  93,  77),
    new Array( /* left mode 4 */ 107,  54,  32,  26,  51,   1,  81,  43,  31),
    new Array( /* left mode 5 */  39,  28,  85, 171,  58, 165,  90,  98,  64),
    new Array( /* left mode 6 */  34,  22, 116, 206,  23,  34,  43, 166,  73),
    new Array( /* left mode 7 */  68,  25, 106,  22,  64, 171,  36, 225, 114),
    new Array( /* left mode 8 */  34,  19,  21, 102, 132, 188,  16,  76, 124),
    new Array( /* left mode 9 */  62,  18,  78,  95,  85,  57,  50,  48,  51)
  ),
  new Array( /* above mode 3 */
    new Array( /* left mode 0 */ 193, 101,  35, 159, 215, 111,  89,  46, 111),
    new Array( /* left mode 1 */  60, 148,  31, 172, 219, 228,  21,  18, 111),
    new Array( /* left mode 2 */ 112, 113,  77,  85, 179, 255,  38, 120, 114),
    new Array( /* left mode 3 */  40,  42, 1, 196, 245, 209,  10,  25, 109),
    new Array( /* left mode 4 */ 100,  80, 8,  43, 154,   1,  51,  26,  71),
    new Array( /* left mode 5 */  88,  43,  29, 140, 166, 213,  37,  43, 154),
    new Array( /* left mode 6 */  61,  63,  30, 155,  67,  45,  68,   1, 209),
    new Array( /* left mode 7 */ 142,  78,  78,  16, 255, 128,  34, 197, 171),
    new Array( /* left mode 8 */  41,  40, 5, 102, 211, 183, 4,   1, 221),
    new Array( /* left mode 9 */  51,  50,  17, 168, 209, 192,  23,  25,  82)
  ),
  new Array( /* above mode 4 */
    new Array( /* left mode 0 */ 125,  98,  42,  88, 104,  85, 117, 175,  82),
    new Array( /* left mode 1 */  95,  84,  53,  89, 128, 100, 113, 101,  45),
    new Array( /* left mode 2 */  75,  79, 123,  47,  51, 128,  81, 171,   1),
    new Array( /* left mode 3 */  57,  17, 5,  71, 102,  57,  53,  41,  49),
    new Array( /* left mode 4 */ 115,  21, 2,  10, 102, 255, 166,  23,   6),
    new Array( /* left mode 5 */  38,  33,  13, 121,  57,  73,  26,   1,  85),
    new Array( /* left mode 6 */  41,  10,  67, 138,  77, 110,  90,  47, 114),
    new Array( /* left mode 7 */ 101,  29,  16,  10,  85, 128, 101, 196,  26),
    new Array( /* left mode 8 */  57,  18,  10, 102, 102, 213,  34,  20,  43),
    new Array( /* left mode 9 */ 117,  20,  15,  36, 163, 128,  68,   1,  26)
  ),
  new Array( /* above mode 5 */
    new Array( /* left mode 0 */ 138,  31,  36, 171,  27, 166,  38,  44, 229),
    new Array( /* left mode 1 */  67,  87,  58, 169,  82, 115,  26,  59, 179),
    new Array( /* left mode 2 */  63,  59,  90, 180,  59, 166,  93,  73, 154),
    new Array( /* left mode 3 */  40,  40,  21, 116, 143, 209,  34,  39, 175),
    new Array( /* left mode 4 */  57,  46,  22,  24, 128,   1,  54,  17,  37),
    new Array( /* left mode 5 */  47,  15,  16, 183,  34, 223,  49,  45, 183),
    new Array( /* left mode 6 */  46,  17,  33, 183,   6,  98,  15,  32, 183),
    new Array( /* left mode 7 */  65,  32,  73, 115,  28, 128,  23, 128, 205),
    new Array( /* left mode 8 */  40,   3, 9, 115,  51, 192,  18,   6, 223),
    new Array( /* left mode 9 */  87,  37, 9, 115,  59,  77,  64,  21,  47)
  ),
  new Array( /* above mode 6 */
    new Array( /* left mode 0 */ 104,  55,  44, 218,   9,  54,  53, 130, 226),
    new Array( /* left mode 1 */  64,  90,  70, 205,  40,  41,  23,  26,  57),
    new Array( /* left mode 2 */  54,  57, 112, 184,   5,  41,  38, 166, 213),
    new Array( /* left mode 3 */  30,  34,  26, 133, 152, 116,  10,  32, 134),
    new Array( /* left mode 4 */  75,  32,  12,  51, 192, 255, 160,  43,  51),
    new Array( /* left mode 5 */  39,  19,  53, 221,  26, 114,  32,  73, 255),
    new Array( /* left mode 6 */  31,   9,  65, 234,   2,  15, 1, 118,  73),
    new Array( /* left mode 7 */  88,  31,  35,  67, 102,  85,  55, 186,  85),
    new Array( /* left mode 8 */  56,  21,  23, 111,  59, 205,  45,  37, 192),
    new Array( /* left mode 9 */  55,  38,  70, 124,  73, 102, 1,  34,  98)
  ),
  new Array( /* above mode 7 */
    new Array( /* left mode 0 */ 102,  61,  71,  37,  34,  53,  31, 243, 192),
    new Array( /* left mode 1 */  69,  60,  71,  38,  73, 119,  28, 222,  37),
    new Array( /* left mode 2 */  68,  45, 128,  34,   1,  47,  11, 245, 171),
    new Array( /* left mode 3 */  62,  17,  19,  70, 146,  85,  55,  62,  70),
    new Array( /* left mode 4 */  75,  15, 9,   9,  64, 255, 184, 119,  16),
    new Array( /* left mode 5 */  37,  43,  37, 154, 100, 163,  85, 160,   1),
    new Array( /* left mode 6 */  63,   9,  92, 136,  28,  64,  32, 201,  85),
    new Array( /* left mode 7 */  86,   6,  28,   5,  64, 255,  25, 248,   1),
    new Array( /* left mode 8 */  56,   8,  17, 132, 137, 255,  55, 116, 128),
    new Array( /* left mode 9 */  58,  15,  20,  82, 135,  57,  26, 121,  40)
  ),
  new Array( /* above mode 8 */
    new Array( /* left mode 0 */ 164,  50,  31, 137, 154, 133,  25,  35, 218),
    new Array( /* left mode 1 */  51, 103,  44, 131, 131, 123,  31,   6, 158),
    new Array( /* left mode 2 */  86,  40,  64, 135, 148, 224,  45, 183, 128),
    new Array( /* left mode 3 */  22,  26,  17, 131, 240, 154,  14,   1, 209),
    new Array( /* left mode 4 */  83,  12,  13,  54, 192, 255,  68,  47,  28),
    new Array( /* left mode 5 */  45,  16,  21,  91,  64, 222, 7,   1, 197),
    new Array( /* left mode 6 */  56,  21,  39, 155,  60, 138,  23, 102, 213),
    new Array( /* left mode 7 */  85,  26,  85,  85, 128, 128,  32, 146, 171),
    new Array( /* left mode 8 */  18,  11, 7,  63, 144, 171, 4,   4, 246),
    new Array( /* left mode 9 */  35,  27,  10, 146, 174, 171,  12,  26, 128)
  ),
  new Array( /* above mode 9 */
    new Array( /* left mode 0 */ 190,  80,  35,  99, 180,  80, 126,  54,  45),
    new Array( /* left mode 1 */  85, 126,  47,  87, 176,  51,  41,  20,  32),
    new Array( /* left mode 2 */ 101,  75, 128, 139, 118, 146, 116, 128,  85),
    new Array( /* left mode 3 */  56,  41,  15, 176, 236,  85,  37,   9,  62),
    new Array( /* left mode 4 */ 146,  36,  19,  30, 171, 255,  97,  27,  20),
    new Array( /* left mode 5 */  71,  30,  17, 119, 118, 255,  17,  18, 138),
    new Array( /* left mode 6 */ 101,  38,  60, 138,  55,  70,  43,  26, 142),
    new Array( /* left mode 7 */ 138,  45,  61,  62, 219,   1,  81, 188,  64),
    new Array( /* left mode 8 */  32,  41,  20, 117, 151, 142,  20,  21, 163),
    new Array( /* left mode 9 */ 112,  19,  12,  61, 195, 128,  48,   4,  24)
  )
);
var kf_y_mode_tree =
new Array(
  -B_PRED, 2,
  4, 6,
  -DC_PRED, -V_PRED,
  -H_PRED, -TM_PRED
);
var y_mode_tree =
new Array(
  -DC_PRED, 2,
  4, 6,
  -V_PRED, -H_PRED,
  -TM_PRED, -B_PRED
);
var uv_mode_tree =
new Array(
  -DC_PRED, 2,
  -V_PRED, 4,
  -H_PRED, -TM_PRED
);
var b_mode_tree =
new Array(
  -B_DC_PRED, 2,                 /* 0 = DC_NODE */
  -B_TM_PRED, 4,                /* 1 = TM_NODE */
  -B_VE_PRED, 6,               /* 2 = VE_NODE */
  8, 12,                  /* 3 = COM_NODE */
  -B_HE_PRED, 10,              /* 4 = HE_NODE */
  -B_RD_PRED, -B_VR_PRED,         /* 5 = RD_NODE */
  -B_LD_PRED, 14,              /* 6 = LD_NODE */
  -B_VL_PRED, 16,            /* 7 = VL_NODE */
  -B_HD_PRED, -B_HU_PRED         /* 8 = HD_NODE */
);
var small_mv_tree =
new Array(
  2, 8,
  4, 6,
  -0, -1,
  -2, -3,
  10, 12,
  -4, -5,
  -6, -7
);
var mv_ref_tree =
new Array(
  -ZEROMV, 2,
  -NEARESTMV, 4,
  -NEARMV, 6,
  -NEWMV, -SPLITMV
);
var submv_ref_tree =
new Array(
  -LEFT4X4, 2,
  -ABOVE4X4, 4,
  -ZERO4X4, -NEW4X4
);
var split_mv_tree =
new Array(
  -3, 2,
  -2, 4,
  -0, -1
);
var default_b_mode_probs =
new Array( 120,  90,  79, 133,  87,  85,  80, 111, 151);
var mv_counts_to_probs =
new Array(
  new Array( 7,   1,   1, 143 ),
  new Array(  14,  18,  14, 107 ),
  new Array( 135,  64,  57,  68 ),
  new Array(  60,  56, 128,  65 ),
  new Array( 159, 134, 128,  34 ),
  new Array( 234, 188, 128,  28 )

);
var split_mv_probs =
new Array( 110, 111, 150);
var submv_ref_probs2 =
new Array(
  new Array( 147, 136, 18 ),
  new Array( 106, 145,  1 ),
  new Array( 179, 121,  1 ),
  new Array( 223,   1, 34 ),
  new Array( 208,   1,  1 )
);

var mv_partitions =
new Array(
  new Array(0, 0, 0, 0, 0, 0, 0, 0, 1, 1,  1,  1,  1,  1,  1,  1 ),
  new Array(0, 0, 1, 1, 0, 0, 1, 1, 0, 0,  1,  1,  0,  0,  1,  1 ),
  new Array(0, 0, 1, 1, 0, 0, 1, 1, 2, 2,  3,  3,  2,  2,  3,  3 ),
  new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 )
);


//16
var mv_clamp_rect = function()
{
    this.to_left=int_, this.to_right=int_, this.to_top=int_, this.to_bottom=int_
};


//22
function
        clamp_mv(raw, bounds)
{
    var newmv=new mv();


    newmv.d.x = (raw.d.x < bounds.to_left)
                ? bounds.to_left : raw.d.x;
    newmv.d.x = (raw.d.x > bounds.to_right)
                ? bounds.to_right : newmv.d.x;
    newmv.d.y = (raw.d.y < bounds.to_top)
                ? bounds.to_top : raw.d.y;
    newmv.d.y = (raw.d.y > bounds.to_bottom)
                ? bounds.to_bottom : newmv.d.y;
    return newmv;
}


//39
function
read_segment_id(bool, seg)
{
    return bool_get(bool, seg.tree_probs[0])
           ? 2 + bool_get(bool, seg.tree_probs[2])
           : bool_get(bool, seg.tree_probs[1]);
}


//48
function
above_block_mode(this_,//*
                 above,//*
                 b)
{
    if (b < 4)
    {
        switch (above.base.y_mode)
        {
        case DC_PRED:
            return B_DC_PRED;
        case V_PRED:
            return B_VE_PRED;
        case H_PRED:
            return B_HE_PRED;
        case TM_PRED:
            return B_TM_PRED;
        case B_PRED:
            return above.splitt.mvs[b+12].d.x;
        default:
            assert(0);
        }
    }

    return this_.splitt.mvs[b-4].d.x;
}


//76
function
left_block_mode(this_,//*
                left,//*
                b)
{
    if (!(b & 3))
    {
        switch (left.base.y_mode)
        {
        case DC_PRED:
            return B_DC_PRED;
        case V_PRED:
            return B_VE_PRED;
        case H_PRED:
            return B_HE_PRED;
        case TM_PRED:
            return B_TM_PRED;
        case B_PRED:
            return left.splitt.mvs[b+3].d.x;
        default:
            assert(0);
        }
    }

    return this_.splitt.mvs[b-1].d.x;
}


//104
function
decode_kf_mb_mode(this_, this_off,//*
                  left, left_off,//*
                  above, above_off,//*
                  bool)//*
{
    var y_mode=int_, uv_mode=int_;

    y_mode = bool_read_tree(bool, kf_y_mode_tree, kf_y_mode_probs);

    if (y_mode == B_PRED)
    {
        var i=int_;

        for (i = 0; i < 16; i++)
        {
            var a = above_block_mode(this_[this_off], above[above_off], i);
            var l = left_block_mode(this_[this_off], left[left_off], i);
            var b=0;//enum prediction_mode

            b = bool_read_tree(bool, b_mode_tree,
                               kf_b_mode_probs[a][l]);
            this_[this_off].splitt.modes[i] = this_[this_off].splitt.mvs[i].d.x = b;this_[this_off].splitt.mvs[i].d.y = 0;
        }
    }

    uv_mode = bool_read_tree(bool, uv_mode_tree, kf_uv_mode_probs);

    this_[this_off].base.y_mode = y_mode;
    this_[this_off].base.uv_mode = uv_mode;
    this_[this_off].base.mv.d.x = this_[this_off].base.mv.d.y = 0;//raw = 0;
    this_[this_off].base.ref_frame = 0;
}


//139
function
decode_intra_mb_mode(this_,
                     hdr,
                     bool)
{
    /* Like decode_kf_mb_mode, but with probabilities transmitted in the
     * bitstream and no context on the above/left block mode.
     */
    var y_mode=int_, uv_mode=int_;

    y_mode = bool_read_tree(bool, y_mode_tree, hdr.y_mode_probs);

    if (y_mode == B_PRED)
    {
        var i=int_;

        for (i = 0; i < 16; i++)
        {
            var b;//enum ='prediction_mode'

            b = bool_read_tree(bool, b_mode_tree, default_b_mode_probs);
            this_.splitt.modes[i] = this_.splitt.mvs[i].d.x = b;this_.splitt.mvs[i].d.y = 0;
        }
    }

    uv_mode = bool_read_tree(bool, uv_mode_tree, hdr.uv_mode_probs);

    this_.base.y_mode = y_mode;
    this_.base.uv_mode = uv_mode;
    this_.base.mv.d.x = this_.base.mv.d.y = 0;//.raw
    this_.base.ref_frame = CURRENT_FRAME;
}


//173
function
read_mv_component(bool,
                  mvc)
{
    var IS_SHORT=0, SIGN=1, SHORT=2, BITS = SHORT + 8 - 1, LONG_WIDTH = 10;
    var x = 0;

    if (bool_get(bool, mvc[IS_SHORT])) /* Large */
    {
        var i = 0;

        for (i = 0; i < 3; i++)
            x += bool_get(bool, mvc[BITS + i]) << i;

        /* Skip bit 3, which is sometimes implicit */
        for (i = LONG_WIDTH - 1; i > 3; i--)
            x += bool_get(bool, mvc[BITS + i]) << i;

        if (!(x & 0xFFF0)  ||  bool_get(bool, mvc[BITS + 3]))
            x += 8;
    }
    else   /* small */
        x = bool_read_tree(bool, small_mv_tree, mvc, + SHORT);//todo

    if (x && bool_get(bool, mvc[SIGN]))
        x = -x;

    return (x << 1);
}


//204
function
above_block_mv(this_,
               above_,
               b)
{
    if (b < 4)
    {
        if (above_.base.y_mode == SPLITMV)
            return above_.splitt.mvs[b+12];

        return above_.base.mv;
    }

    return this_.splitt.mvs[b-4];
}


//221
function
left_block_mv(this_,
              left_,
              b)
{
    if (!(b & 3))
    {
        if (left_.base.y_mode == SPLITMV)
            return left_.splitt.mvs[b+3];

        return left_.base.mv;
    }

    return this_.splitt.mvs[b-1];
}


//238
function
submv_ref(bool, l, a)
{
    var
        SUBMVREF_NORMAL=0,
        SUBMVREF_LEFT_ZED=1,
        SUBMVREF_ABOVE_ZED=2,
        SUBMVREF_LEFT_ABOVE_SAME=3,
        SUBMVREF_LEFT_ABOVE_ZED=4
    ;

    var lez = !(l.d.x || l.d.y)+0;//.raw
    var aez = !(a.d.x || a.d.y)+0;//.raw
    var lea = (l.d.x == a.d.x && l.d.y == a.d.y)+0;//l.raw == a.raw
    var ctx = SUBMVREF_NORMAL;

    if (lea && lez)
        ctx = SUBMVREF_LEFT_ABOVE_ZED;
    else if (lea)
        ctx = SUBMVREF_LEFT_ABOVE_SAME;
    else if (aez)
        ctx = SUBMVREF_ABOVE_ZED;
    else if (lez)
        ctx = SUBMVREF_LEFT_ZED;

    return bool_read_tree(bool, submv_ref_tree, submv_ref_probs2[ctx]);
}


//268
function
read_mv(bool,
        mv,
        mvc)
{
    mv.d.y = read_mv_component(bool, mvc[0]);
    mv.d.x = read_mv_component(bool, mvc[1]);
}


//278
function
mv_bias(mb,
        sign_bias,
        ref_frame,
        mv)
{
    if (sign_bias[mb.base.ref_frame] ^ sign_bias[ref_frame])
    {
        mv.d.x *= -1;
        mv.d.y *= -1;
    }
}

//292
var
    CNT_BEST = 0,
    CNT_ZEROZERO = 0,
    CNT_NEAREST = 1,
    CNT_NEAR = 2,
    CNT_SPLITMV = 3
;

var this_mv_1=new mv();var this_mv_2=new mv();
//302
function
find_near_mvs(this_,
              left,
			  left_off,
              above,
			  above_off,
              sign_bias,
              near_mvs,
              cnt)
{
    var aboveleft = above; var aboveleft_off = above_off - 1;
    var mv_ = (near_mvs);var mv_off = 0;
    var cntx = cnt; var cntx_off = 0;

    /* Zero accumulators */
    mv_[0].d.x = mv_[1].d.x = mv_[2].d.x = 0;//.raw
    mv_[0].d.y = mv_[1].d.y = mv_[2].d.y = 0;//.raw
    cnt[0] = cnt[1] = cnt[2] = cnt[3] = 0;
	
	var above_ = above[above_off]; var left_ = left[left_off]; var aboveleft_ = aboveleft[aboveleft_off];
    /* Process above */
    if (above_.base.ref_frame != CURRENT_FRAME)
    {
        if (above_.base.mv.d.x || above_.base.mv.d.y)//.raw
        {
            mv_[(++mv_off)].d.x = above_.base.mv.d.x;//.raw
            mv_[(  mv_off)].d.y = above_.base.mv.d.y;//.raw
            mv_bias(above_, sign_bias, this_.base.ref_frame, mv_[mv_off]);
            ++cntx_off;
        }

        cntx[cntx_off] += 2;
    }

    /* Process left */
    if (left_.base.ref_frame != CURRENT_FRAME)
    {
        if (left_.base.mv.d.x || left_.base.mv.d.y)//.raw
        {
            var this_mv=this_mv_1;

            this_mv.d.x = left_.base.mv.d.x;//.raw
            this_mv.d.y = left_.base.mv.d.y;//.raw
            mv_bias(left_, sign_bias, this_.base.ref_frame, this_mv);

            if (this_mv.d.x != mv_[mv_off].d.x || this_mv.d.y != mv_[mv_off].d.y)//.raw!=->raw
            {
                mv_[(++mv_off)].d.x = this_mv.d.x;//->raw
                mv_[(  mv_off)].d.y = this_mv.d.y;//->raw
                ++cntx_off;
            }

            cntx[cntx_off] += 2;
        }
        else
            cnt[CNT_ZEROZERO] += 2;
    }

    /* Process above left */
    if (aboveleft_.base.ref_frame != CURRENT_FRAME)
    {
        if (aboveleft_.base.mv.d.x || aboveleft_.base.mv.d.y)//.raw
        {
            var this_mv=this_mv_2;

            this_mv.d.x = aboveleft_.base.mv.d.x;//.raw
            this_mv.d.y = aboveleft_.base.mv.d.y;//.raw
            mv_bias(aboveleft_, sign_bias, this_.base.ref_frame,
                    this_mv);

            if (this_mv.d.x != mv_[mv_off].d.x || this_mv.d.y != mv_[mv_off].d.y)//.raw
            {
                mv_[(++mv_off)].d.x = this_mv.d.x;//.raw
                mv_[(  mv_off)].d.y = this_mv.d.y;//.raw
                ++cntx_off;
            }

            cntx[cntx_off] += 1;
        }
        else
            cnt[CNT_ZEROZERO] += 1;
    }

    /* If we have three distinct MV's ... */
    if (cnt[CNT_SPLITMV])
    {
        /* See if above-left MV can be merged with NEAREST */
        if (mv_[mv_off].d.x == near_mvs[CNT_NEAREST].d.x && mv_[mv_off].d.y == near_mvs[CNT_NEAREST].d.y)//.raw
            cnt[CNT_NEAREST] += 1;
    }

    cnt[CNT_SPLITMV] = ((above_.base.y_mode == SPLITMV)
                        + (left_.base.y_mode == SPLITMV)) * 2
                       + (aboveleft_.base.y_mode == SPLITMV);

    /* Swap near and nearest if necessary */
    if (cnt[CNT_NEAR] > cnt[CNT_NEAREST])
    {
        var tmp=int_;var tmp2=int_;
        tmp = cnt[CNT_NEAREST];
        cnt[CNT_NEAREST] = cnt[CNT_NEAR];
        cnt[CNT_NEAR] = tmp;
        tmp = near_mvs[CNT_NEAREST].d.x;//.raw;
        tmp2 = near_mvs[CNT_NEAREST].d.y;//.raw;
        near_mvs[CNT_NEAREST].d.x = near_mvs[CNT_NEAR].d.x;
        near_mvs[CNT_NEAREST].d.y = near_mvs[CNT_NEAR].d.y;
        near_mvs[CNT_NEAR].d.x = tmp;
        near_mvs[CNT_NEAR].d.y = tmp2;
    }

    /* Use near_mvs[CNT_BEST] to store the "best" MV. Note that this
     * storage shares the same address as near_mvs[CNT_ZEROZERO].
     */
    if (cnt[CNT_NEAREST] >= cnt[CNT_BEST]) {
        near_mvs[CNT_BEST].d.x = near_mvs[CNT_NEAREST].d.x;
        near_mvs[CNT_BEST].d.y = near_mvs[CNT_NEAREST].d.y;
	}
}


//408
function
decode_split_mv(this_,
                left_,
                above_,
                hdr,
                best_mv,
                bool)
{
    var partition=int_;//*
    var j=int_, k=int_, mask=int_, partition_id=int_;

    partition_id = bool_read_tree(bool, split_mv_tree, split_mv_probs);
    partition = mv_partitions[partition_id];
    this_.base.partitioning = partition_id;

    for (j = 0, mask = 0; mask < 65535; j++)
    {
        var mv_=new mv(), left_mv, above_mv;//='mv'='mv'
        var subblock_mode;//='prediction_mode'

        /* Find the first subblock in this partition. */
        for (k = 0; j != partition[k]; k++);

        /* Decode the next MV */
        left_mv = left_block_mv(this_, left_, k);
        above_mv = above_block_mv(this_, above_, k);
        subblock_mode = submv_ref(bool, left_mv,  above_mv);

        switch (subblock_mode)
        {
        case LEFT4X4:
            mv_ = left_mv;
            break;
        case ABOVE4X4:
            mv_ = above_mv;
            break;
        case ZERO4X4:
            mv_.d.x = mv_.d.y = 0;//.raw
            break;
        case NEW4X4:
            read_mv(bool, mv_, hdr.mv_probs);
            mv_.d.x += best_mv.d.x;
            mv_.d.y += best_mv.d.y;
            break;
        default:
            assert(0);
        }

        /* Fill the MV's for this partition */
        for (; k < 16; k++)
            if (j == partition[k])
            {
                this_.splitt.mvs[k].d.x = mv_.d.x;
                this_.splitt.mvs[k].d.y = mv_.d.y;
                mask |= 1 << k;
            }
    }
}


//467
function
need_mc_border(mv, l, t, b_w, w, h)
{
    var b=int_, r=int_;

    /* Get distance to edge for top-left pixel */
    l += (mv.d.x >> 3);
    t += (mv.d.y >> 3);

    /* Get distance to edge for bottom-right pixel */
    r = w - (l + b_w);
    b = h - (t + b_w);

    return (l >> 1 < 2 || r >> 1 < 3 || t >> 1 < 2 || b >> 1 < 3);
}

var near_mvs_4=Arr_new(4,mv),mv_cnts_4=new Array(0,0,0,0);//4
var probs_4=new Array(0,0,0,0);//4
var chroma_mv_4=Arr_new(4,mv);
var clamped_best_mv_1=new mv();
//483
function
decode_mvs(ctx,
           this_,
           this_off,
           left,
           left_off,
           above,
           above_off,
           bounds,
           bool)
{
    var hdr = ctx.entropy_hdr;
    var near_mvs=near_mvs_4;
    var clamped_best_mv=clamped_best_mv_1;
    var mv_cnts=mv_cnts_4;//Arr(4,int_);
    var probs=probs_4;//Arr(4,char_);
    var BEST=0, NEAREST=1, NEAR=2;
    var x=int_, y=int_, w=int_, h=int_, b=int_;

    this_[this_off].base.ref_frame = bool_get(bool, hdr.prob_last)
                           ? 2 + bool_get(bool, hdr.prob_gf)
                           : 1;

    find_near_mvs(this_[this_off], this_, this_off - 1, above, above_off, ctx.reference_hdr.sign_bias,
                  near_mvs, mv_cnts);
    probs[0] = mv_counts_to_probs[mv_cnts[0]][0];
    probs[1] = mv_counts_to_probs[mv_cnts[1]][1];
    probs[2] = mv_counts_to_probs[mv_cnts[2]][2];
    probs[3] = mv_counts_to_probs[mv_cnts[3]][3];

    this_=this_[this_off];
	
    this_.base.y_mode = bool_read_tree(bool, mv_ref_tree, probs);
    this_.base.uv_mode = this_.base.y_mode;

    this_.base.need_mc_border = 0;
    x = (-bounds.to_left - 128) >> 3;
    y = (-bounds.to_top - 128) >> 3;
    w = ctx.mb_cols * 16;
    h = ctx.mb_rows * 16;

    switch (this_.base.y_mode)
    {
    case NEARESTMV:
        this_.base.mv = clamp_mv(near_mvs[NEAREST], bounds);
        break;
    case NEARMV:
        this_.base.mv = clamp_mv(near_mvs[NEAR], bounds);
        break;
    case ZEROMV:
        this_.base.mv.d.x = this_.base.mv.d.y = 0;//.raw
        return; //skip need_mc_border check
    case NEWMV:
        clamped_best_mv = clamp_mv(near_mvs[BEST], bounds);
        read_mv(bool, this_.base.mv, hdr.mv_probs);//&this->base.mv
        this_.base.mv.d.x += clamped_best_mv.d.x;
        this_.base.mv.d.y += clamped_best_mv.d.y;
        break;
    case SPLITMV:
    {
        var chroma_mv=chroma_mv_4;// = {{{0}}};

        clamped_best_mv = clamp_mv(near_mvs[BEST], bounds);
        decode_split_mv(this_, left[left_off], above[above_off], hdr, clamped_best_mv, bool);//&clamped_best_mv
        this_.base.mv.d.x = this_.splitt.mvs[15].d.x;this_.base.mv.d.y = this_.splitt.mvs[15].d.y;

        for (b = 0; b < 16; b++)
        {
            chroma_mv[(b>>1&1) + (b>>2&2)].d.x +=
                this_.splitt.mvs[b].d.x;
            chroma_mv[(b>>1&1) + (b>>2&2)].d.y +=
                this_.splitt.mvs[b].d.y;

            if (need_mc_border(this_.splitt.mvs[b],
            x + (b & 3) * 4, y + (b & ~3), 4, w, h))
            {
                this_.base.need_mc_border = 1;
                break;
            }
        }

        for (b = 0; b < 4; b++)
        {
            chroma_mv[b].d.x += 4/* + 8 * (chroma_mv[b].d.x >> 31)*/;
            chroma_mv[b].d.y += 4/* + 8 * (chroma_mv[b].d.y >> 31)*/;
            chroma_mv[b].d.x >>= 2;//chroma_mv[b].d.x=parseInt(chroma_mv[b].d.x,10);
            chroma_mv[b].d.y >>= 2;//chroma_mv[b].d.y=parseInt(chroma_mv[b].d.y,10);

            //note we're passing in non-subsampled coordinates
            if (need_mc_border(chroma_mv[b],
            x + (b & 1) * 8, y + (b >> 1) * 8, 16, w, h))
            {
                this_.base.need_mc_border = 1;
                break;
            }
        }

        return; //skip need_mc_border check
    }
    default:
        assert(0);
    }

    if (need_mc_border(this_.base.mv, x, y, 16, w, h))
        this_.base.need_mc_border = 1;
}

var bounds_=new mv_clamp_rect();
//586
function
vp8_dixie_modemv_process_row(ctx,
bool,
row,
start_col,
num_cols)
{
    var above, above_off=0, this_, this_off=0;//*='(mb_info)'='(mb_info)'
    var col=int_;
    var bounds=bounds_;

    this_ = ctx.mb_info_rows[1+ row]; this_off = ctx.mb_info_rows_off[1+ row] + start_col;
    above = ctx.mb_info_rows[1+ row - 1]; above_off = ctx.mb_info_rows_off[1+ row - 1] + start_col;

    /* Calculate the eighth-pel MV bounds using a 1 MB border. */
    bounds.to_left   = -((start_col + 1) << 7);
    bounds.to_right  = (ctx.mb_cols - start_col) << 7;
    bounds.to_top    = -((row + 1) << 7);
    bounds.to_bottom = (ctx.mb_rows - row) << 7;

    for (col = start_col; col < start_col + num_cols; col++)
    {
        if (ctx.segment_hdr.update_map)
            this_[this_off].base.segment_id = read_segment_id(bool,
            ctx.segment_hdr);

        if (ctx.entropy_hdr.coeff_skip_enabled)
            this_[this_off].base.skip_coeff = bool_get(bool,
            ctx.entropy_hdr.coeff_skip_prob);

        if (ctx.frame_hdr.is_keyframe)
        {
            if (!ctx.segment_hdr.update_map)
                this_[this_off].base.segment_id = 0;

            decode_kf_mb_mode(this_, this_off, this_, this_off - 1, above, above_off, bool);
        }
        else
        {
            if (bool_get(bool, ctx.entropy_hdr.prob_inter))
                decode_mvs(ctx, this_, this_off, this_, this_off - 1, above, above_off, bounds, bool);
            else
                decode_intra_mb_mode(this_[this_off], ctx.entropy_hdr, bool);

            bounds.to_left -= 16 << 3;
            bounds.to_right -= 16 << 3;
        }

        /* Advance to next mb */
        this_off++;
        above_off++;
    }
}


//641
function
vp8_dixie_modemv_init(ctx)
{
    var  mbi_w=int_, mbi_h=int_, i=int_;
    var  mbi=new mb_info(); var mbi_off=0;//*

    mbi_w = ctx.mb_cols + 1; /* For left border col */
    mbi_h = ctx.mb_rows + 1; /* For above border row */

    if (ctx.frame_hdr.frame_size_updated)
    {
        //free(ctx.mb_info_storage);
        ctx.mb_info_storage = null;
        //free(ctx.mb_info_rows_storage);
        ctx.mb_info_rows_storage = null;
    }

    if (!ctx.mb_info_storage) {
        ctx.mb_info_storage = Arr_new(mbi_w * mbi_h,//calloc
        ctx.mb_info_storage_object);
		
		ctx.mb_info_storage_off = 0;
	}//todo: //sizeof(*ctx->mb_info_storage)

    if (!ctx.mb_info_rows_storage) {
        ctx.mb_info_rows_storage = Arr_new(mbi_h,//calloc
        ctx.mb_info_rows_storage_object);
		
		ctx.mb_info_rows_storage_off = new Array(mbi_h);//Arr(mbi_h,0);
	}//sizeof(*ctx->mb_info_rows_storage)

    /* Set up row pointers */
    mbi = ctx.mb_info_storage; mbi_off = ctx.mb_info_storage_off + 1;

    for (i = 0; i < mbi_h; i++)
    {
        ctx.mb_info_rows_storage[i] = mbi;
        ctx.mb_info_rows_storage_off[i] = mbi_off;
        mbi_off += mbi_w;
    }

    ctx.mb_info_rows = ctx.mb_info_rows_storage; ctx.mb_info_rows_off = ctx.mb_info_rows_storage_off;//todo: + 1;
}





//18
var
    EOB_CONTEXT_NODE=0,
    ZERO_CONTEXT_NODE=1,
    ONE_CONTEXT_NODE=2,
    LOW_VAL_CONTEXT_NODE=3,
    TWO_CONTEXT_NODE=4,
    THREE_CONTEXT_NODE=5,
    HIGH_LOW_CONTEXT_NODE=6,
    CAT_ONE_CONTEXT_NODE=7,
    CAT_THREEFOUR_CONTEXT_NODE=8,
    CAT_THREE_CONTEXT_NODE=9,
    CAT_FIVE_CONTEXT_NODE=10
;
//32
var
    ZERO_TOKEN=0,
    ONE_TOKEN=1,
    TWO_TOKEN=2,
    THREE_TOKEN=3,
    FOUR_TOKEN=4,
    DCT_VAL_CATEGORY1=5,
    DCT_VAL_CATEGORY2=6,
    DCT_VAL_CATEGORY3=7,
    DCT_VAL_CATEGORY4=8,
    DCT_VAL_CATEGORY5=9,
    DCT_VAL_CATEGORY6=10,
    DCT_EOB_TOKEN=11,
    MAX_ENTROPY_TOKENS=12
;
//struct extrabits
//{
//    short         min_val;
//    short         length;
//    unsigned char probs[12];
//};
//54
var left_context_index =
new Array(
    0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3,
    4, 4, 5, 5, 6, 6, 7, 7, 8
);
//59
var above_context_index =
new Array(
    0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3,
    4, 5, 4, 5, 6, 7, 6, 7, 8
);
//64
function X(n) { return ((n) * PREV_COEF_CONTEXTS * ENTROPY_NODES) }
var bands_x =
new Array(
    X(0), X(1), X(2), X(3), X(6), X(4), X(5), X(6),
    X(6), X(6), X(6), X(6), X(6), X(6), X(6), X(7)
);
var extrabits =
new Array(
    {  min_val:0, length:-1, probs:new Array(   0,   0,   0,   0,   0,   0,
                  0,   0,   0,   0,   0,   0   ) }, //ZERO_TOKEN
    {  min_val:1, length:0,  probs:new Array(    0,   0,   0,   0,   0,   0,
                  0,   0,   0,   0,   0,   0   ) }, //ONE_TOKEN
    {  min_val:2, length:0,  probs:new Array(    0,   0,   0,   0,   0,   0,
                  0,   0,   0,   0,   0,   0   ) }, //TWO_TOKEN
    {  min_val:3, length:0,  probs:new Array(    0,   0,   0,   0,   0,   0,
                  0,   0,   0,   0,   0,   0   ) }, //THREE_TOKEN
    {  min_val:4, length:0,  probs:new Array(    0,   0,   0,   0,   0,   0,
                  0,   0,   0,   0,   0,   0   ) }, //FOUR_TOKEN
    {  min_val:5, length:0,  probs:new Array(  159,   0,   0,   0,   0,   0,
                  0,   0,   0,   0,   0,   0   ) }, //DCT_VAL_CATEGORY1
    {  min_val:7, length:1,  probs:new Array(  145, 165,   0,   0,   0,   0,
                  0,   0,   0,   0,   0,   0   ) }, //DCT_VAL_CATEGORY2
    { min_val:11, length:2,  probs:new Array(  140, 148, 173,   0,   0,   0,
                  0,   0,   0,   0,   0,   0   ) }, //DCT_VAL_CATEGORY3
    { min_val:19, length:3,  probs:new Array(  135, 140, 155, 176,   0,   0,
                  0,   0,   0,   0,   0,   0   ) }, //DCT_VAL_CATEGORY4
    { min_val:35, length:4,  probs:new Array(  130, 134, 141, 157, 180,   0,
                  0,   0,   0,   0,   0,   0   ) }, //DCT_VAL_CATEGORY5
    { min_val:67, length:10, probs:new Array(  129, 130, 133, 140, 153, 177,
                196, 230, 243, 254, 254,   0   ) }, //DCT_VAL_CATEGORY6
    {  min_val:0, length:-1, probs:new Array(    0,   0,   0,   0,   0,   0,
                  0,   0,   0,   0,   0,   0   ) } // EOB TOKEN
);
var zigzag =
new Array(
    0,  1,  4,  8,  5,  2,  3,  6,  9, 12, 13, 10,  7, 11, 14, 15
);

var BLOCK_LOOP=0,DO_WHILE=1,CHECK_0_=2,CAT_FIVE_CONTEXT_NODE_0_=3,CAT_THREEFOUR_CONTEXT_NODE_0_=4,CAT_THREE_CONTEXT_NODE_0_=5,HIGH_LOW_CONTEXT_NODE_0_=6,CAT_ONE_CONTEXT_NODE_0_=7,LOW_VAL_CONTEXT_NODE_0_=8,THREE_CONTEXT_NODE_0_=9,TWO_CONTEXT_NODE_0_=10,ONE_CONTEXT_NODE_0_=11,BLOCK_FINISHED=12,END=13;
function
decode_mb_tokens(bool,
                 left,
                 above,
                 tokens,
                 tokens_off,
                 mode,
                 probs,
                 factor)
{
//103
function DECODE_AND_APPLYSIGN(value_to_sign) {
    v = (bool_get_bit(bool) ? -value_to_sign
                            : value_to_sign) * dqf[(!!c)+0];
}
function DECODE_AND_BRANCH_IF_ZERO(probability,branch) {
    if (!bool_get(bool, probability)) { goto_ = branch; return 1; }
}
function DECODE_AND_LOOP_IF_ZERO(probability,branch) {
    if (!bool_get(bool, probability))
    {
        prob_off = type_probs_off;
        if(c<15) {
            ++c;
            prob_off += bands_x[c];
            goto_ = branch; return 1;
        }
        else {
            goto_ = BLOCK_FINISHED; return 1; /*for malformed input */
		}
    }
}
function DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val) {
    DECODE_AND_APPLYSIGN(val);
    prob_off = type_probs_off + (ENTROPY_NODES*2);
    if(c < 15){
        b_tokens[b_tokens_off+ zigzag[c]] = v;
        ++c;
        goto_ = DO_WHILE; return 1; }
    b_tokens[b_tokens_off+ zigzag[15]] = v;
    goto_ = BLOCK_FINISHED; return 1;
}

function DECODE_EXTRABIT_AND_ADJUST_VAL(t,bits_count) {
    val += bool_get(bool, extrabits[t].probs[bits_count]) << bits_count;
}

//138
    var i=int_, stopp=int_, type=int_;
    var c=int_, t=int_, v=int_;
    var val=int_, bits_count=int_;
    var eob_mask=int_;
    var b_tokens=short_;var b_tokens_off=0;//*   /* tokens for this block */
    var type_probs=char_;var type_probs_off=0;//* /* probabilities for this block type */
    var prob=char_;var prob_off=0;//*
    var dqf=short_;//*

    eob_mask = 0;

    if (mode != B_PRED && mode != SPLITMV)
    {
        i = 24;
        stopp = 24;
        type = 1;
        b_tokens = tokens; b_tokens_off = tokens_off + 24 * 16;
        dqf = factor[TOKEN_BLOCK_Y2];
    }
    else
    {
        i = 0;
        stopp = 16;
        type = 3;
        b_tokens = tokens; b_tokens_off = tokens_off;
        dqf = factor[TOKEN_BLOCK_Y1];
    }

    /* Save a pointer to the coefficient probs for the current type.
     * Need to repeat this whenever type changes.
     */
    type_probs = probs; /*[type][0][0];*/ type_probs_off = type*COEF_BANDS*PREV_COEF_CONTEXTS*ENTROPY_NODES;

    var goto_=BLOCK_LOOP;
do {
if(goto_==BLOCK_LOOP) {
    t = left[left_context_index[i]] + above[above_context_index[i]];
    c = (!type)+0; /* all blocks start at 0 except type 0, which starts
                * at 1. */

    prob = type_probs; prob_off = type_probs_off;
    prob_off += t * ENTROPY_NODES;

	goto_=DO_WHILE;
}
if(goto_==DO_WHILE) {
    prob_off += bands_x[c];
    if(DECODE_AND_BRANCH_IF_ZERO(prob[prob_off+ EOB_CONTEXT_NODE], BLOCK_FINISHED)) continue;

goto_=CHECK_0_;
}
if(goto_==CHECK_0_) {
    if(DECODE_AND_LOOP_IF_ZERO(prob[prob_off+ ZERO_CONTEXT_NODE], CHECK_0_)) continue;
    if(DECODE_AND_BRANCH_IF_ZERO(prob[prob_off+ ONE_CONTEXT_NODE],
                              ONE_CONTEXT_NODE_0_)) continue;
    if(DECODE_AND_BRANCH_IF_ZERO(prob[prob_off+ LOW_VAL_CONTEXT_NODE],
                              LOW_VAL_CONTEXT_NODE_0_)) continue;
    if(DECODE_AND_BRANCH_IF_ZERO(prob[prob_off+ HIGH_LOW_CONTEXT_NODE],
                              HIGH_LOW_CONTEXT_NODE_0_)) continue;
    if(DECODE_AND_BRANCH_IF_ZERO(prob[prob_off+ CAT_THREEFOUR_CONTEXT_NODE],
                              CAT_THREEFOUR_CONTEXT_NODE_0_)) continue;
    if(DECODE_AND_BRANCH_IF_ZERO(prob[prob_off+ CAT_FIVE_CONTEXT_NODE],
                              CAT_FIVE_CONTEXT_NODE_0_)) continue;
    val = extrabits[DCT_VAL_CATEGORY6].min_val;
    bits_count = extrabits[DCT_VAL_CATEGORY6].length;

    do
    {
        DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY6, bits_count);
        bits_count -- ;
    }
    while (bits_count >= 0);

    if(DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val)) continue;

}
if(goto_==CAT_FIVE_CONTEXT_NODE_0_) {
    val = extrabits[DCT_VAL_CATEGORY5].min_val;
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 4);
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 3);
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 2);
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 1);
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY5, 0);
    if(DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val)) continue;

}
if(goto_==CAT_THREEFOUR_CONTEXT_NODE_0_) {
    if(DECODE_AND_BRANCH_IF_ZERO(prob[prob_off+ CAT_THREE_CONTEXT_NODE],
                              CAT_THREE_CONTEXT_NODE_0_)) continue;
    val = extrabits[DCT_VAL_CATEGORY4].min_val;
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY4, 3);
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY4, 2);
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY4, 1);
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY4, 0);
    if(DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val)) continue;

}
if(goto_==CAT_THREE_CONTEXT_NODE_0_) {
    val = extrabits[DCT_VAL_CATEGORY3].min_val;
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY3, 2);
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY3, 1);
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY3, 0);
    if(DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val)) continue;

}
if(goto_==HIGH_LOW_CONTEXT_NODE_0_) {
    if(DECODE_AND_BRANCH_IF_ZERO(prob[prob_off+ CAT_ONE_CONTEXT_NODE],
                              CAT_ONE_CONTEXT_NODE_0_)) continue;

    val = extrabits[DCT_VAL_CATEGORY2].min_val;
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY2, 1);
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY2, 0);
    if(DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val)) continue;

}
if(goto_==CAT_ONE_CONTEXT_NODE_0_) {
    val = extrabits[DCT_VAL_CATEGORY1].min_val;
    DECODE_EXTRABIT_AND_ADJUST_VAL(DCT_VAL_CATEGORY1, 0);
    if(DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(val)) continue;

}
if(goto_==LOW_VAL_CONTEXT_NODE_0_) {
    if(DECODE_AND_BRANCH_IF_ZERO(prob[prob_off+ TWO_CONTEXT_NODE],
                              TWO_CONTEXT_NODE_0_)) continue;
    if(DECODE_AND_BRANCH_IF_ZERO(prob[prob_off+ THREE_CONTEXT_NODE],
                              THREE_CONTEXT_NODE_0_)) continue;
    if(DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(4)) continue;

}
if(goto_==THREE_CONTEXT_NODE_0_) {
    if(DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(3)) continue;

}
if(goto_==TWO_CONTEXT_NODE_0_) {
    if(DECODE_SIGN_WRITE_COEFF_AND_CHECK_EXIT(2)) continue;

}
if(goto_==ONE_CONTEXT_NODE_0_) {
    DECODE_AND_APPLYSIGN(1);
    prob_off = type_probs_off + ENTROPY_NODES;

    if (c < 15)
    {
        b_tokens[b_tokens_off+ zigzag[c]] = v;
        ++c;
        goto_ = DO_WHILE; continue;
    }

    b_tokens[b_tokens_off+ zigzag[15]] = v;
goto_=BLOCK_FINISHED;	
}
if(goto_==BLOCK_FINISHED) {
    eob_mask = (eob_mask | ((c > 1)+0 << i))>>>0;
    t = (c != !type)+0;   // any nonzero data?
    eob_mask = (eob_mask | (t << 31))>>>0;//intBitLeft(t , 31);

    left[left_context_index[i]] = above[above_context_index[i]] = t;
    b_tokens_off += 16;

    i++;

    if (i < stopp) {
        goto_ = BLOCK_LOOP; continue;}

    if (i == 25)
    {
        type = 0;
        i = 0;
        stopp = 16;
        type_probs_off = type*COEF_BANDS*PREV_COEF_CONTEXTS*ENTROPY_NODES;//type_probs = probs[type][0][0];
        b_tokens_off = tokens_off;
        dqf = factor[TOKEN_BLOCK_Y1];
        goto_ = BLOCK_LOOP; continue;
    }

    if (i == 16)
    {
        type = 2;
        type_probs_off = type*COEF_BANDS*PREV_COEF_CONTEXTS*ENTROPY_NODES;//type_probs = probs[type][0][0];
        stopp = 24;
        dqf = factor[TOKEN_BLOCK_UV];
        goto_ = BLOCK_LOOP; continue;
    }
}
goto_ = END;
} while(goto_!=END);

    return eob_mask;
}


//318
function
reset_row_context(left)
{
    memset(left, 0, 0, left.length/**sizeof(left)*/);
}


//325
function
reset_above_context(above, cols)
{
    var col=0;
    for(col=0;col<cols;++col)
    memset(above[col], 0, 0, above[col].length);//cols * *sizeof(above)
}


function
reset_mb_context(left,
                 above,
                 mode)
{
    /* Reset the macroblock context on the left and right. We have to
     * preserve the context of the second order block if this mode
     * would not have updated it.
     */
    memset(left, 0, 0,/* sizeof((left)[0]) **/ 8);
    memset(above, 0, 0,/* sizeof((above)[0]) **/ 8);

    if (mode != B_PRED && mode != SPLITMV)
    {
        (left)[8] = 0;
        (above)[8] = 0;
    }
}


//352
function
vp8_dixie_tokens_process_row(ctx,
                             partition,
                             row,
                             start_col,
                             num_cols)
{
    var tokens = ctx.tokens[partition];//*
    var coeffs = tokens.coeffs; var coeffs_off = + 25 * 16 * start_col;//short*
    var col=int_;
    var above = ctx.above_token_entropy_ctx; var above_off = 
                                  + start_col;
    var left = tokens.left_token_entropy_ctx; var left_off = 0;
    var mbi = ctx.mb_info_rows[1+ row]; var mbi_off = ctx.mb_info_rows_off[1+ row] + start_col;

    if (row == 0)
        reset_above_context(above, num_cols);

    if (start_col == 0)
        reset_row_context(left);

    for (col = start_col; col < start_col + num_cols; col++)
    {
        memset(coeffs, coeffs_off, 0, 25 * 16 );//* sizeof(short_)

        if (mbi[mbi_off].base.skip_coeff)
        {
            reset_mb_context(left, above[above_off], mbi[mbi_off].base.y_mode);
            mbi[mbi_off].base.eob_mask = 0;
        }
        else
        {
            var dqf;var dqf_off=0;//*='(dequant_factors)'

            dqf = ctx.dequant_factors; dqf_off = + mbi[mbi_off].base.segment_id;
            mbi[mbi_off].base.eob_mask =
                decode_mb_tokens(tokens.bool,
                                 left, above[above_off],
                                 coeffs, coeffs_off,
                                 mbi[mbi_off].base.y_mode,
                                 ctx.entropy_hdr.coeff_probs_,
                                 dqf[dqf_off].factor);
        }

        above_off++;
        mbi_off++;
        coeffs_off += 25 * 16;
    }
}


//403
function
vp8_dixie_tokens_init(ctx)
{
    var  partitions = ctx.token_hdr.partitions;

    if (ctx.frame_hdr.frame_size_updated)
    {
        var i=int_;
        var coeff_row_sz =
            ctx.mb_cols * 25 * 16/* * sizeof(short_)*/;

        for (i = 0; i < partitions; i++)
        {
            //free(ctx.tokens[i].coeffs);
            ctx.tokens[i].coeffs = new Array(coeff_row_sz);//Arr(coeff_row_sz,0);//memalign(16, coeff_row_sz);

            if (!ctx.tokens[i].coeffs)
                vpx_internal_error(ctx.error, VPX_CODEC_MEM_ERROR,
                                   null);
        }

        //free(ctx.above_token_entropy_ctx);
        ctx.above_token_entropy_ctx =
            Arr_new(ctx.mb_cols, ctx.above_token_entropy_ctx_object);//calloc

        if (!ctx.above_token_entropy_ctx)
            vpx_internal_error(ctx.error, VPX_CODEC_MEM_ERROR, null);
    }
}





//13
function ABS(x) { return ((x) >= 0 ? (x) : -(x)) }

//25
function
saturate_int8(x)
{
    if (x < -128)
        return -128;

    if (x > 127)
        return 127;

    return x;
}

//38
function
saturate_uint8(x)
{
    if (x < 0)
        return 0;

    if (x > 255)
        return 255;

    return x;
}


//51
function
high_edge_variance(pixels,
				   pixels_off,
                   stride,
                   hev_threshold)
{
//var p3 = pixels[pixels_off -4*stride];
//var p2 = pixels[pixels_off -3*stride];
var p1 = pixels[pixels_off -2*stride];
var p0 = pixels[pixels_off -1*stride];
var q0 = pixels[pixels_off+ 0*stride];
var q1 = pixels[pixels_off+ 1*stride];
//var q2 = pixels[pixels_off+ 2*stride];
//var q3 = pixels[pixels_off+ 3*stride];

    return ABS(p1 - p0) > hev_threshold || ABS(q1 - q0) > hev_threshold;
}


//60
function
simple_threshold(pixels,
				 pixels_off,
                 stride,
                 filter_limit)
{
//var p3 = pixels[pixels_off -4*stride];
//var p2 = pixels[pixels_off -3*stride];
var p1 = pixels[pixels_off -2*stride];
var p0 = pixels[pixels_off -1*stride];
var q0 = pixels[pixels_off+ 0*stride];
var q1 = pixels[pixels_off+ 1*stride];
//var q2 = pixels[pixels_off+ 2*stride];
//var q3 = pixels[pixels_off+ 3*stride];

    return (ABS(p0 - q0) * 2 + (ABS(p1 - q1) >> 1)) <= filter_limit;
}


//69
function
normal_threshold(pixels,
				 pixels_off,
                 stride,
                 edge_limit,
                 interior_limit)
{
var p3 = pixels[pixels_off -4*stride];
var p2 = pixels[pixels_off -3*stride];
var p1 = pixels[pixels_off -2*stride];
var p0 = pixels[pixels_off -1*stride];
var q0 = pixels[pixels_off+ 0*stride];
var q1 = pixels[pixels_off+ 1*stride];
var q2 = pixels[pixels_off+ 2*stride];
var q3 = pixels[pixels_off+ 3*stride];

    var E = edge_limit;
    var I = interior_limit;

    return simple_threshold(pixels, pixels_off, stride, 2 * E + I)
           && ABS(p3 - p2) <= I && ABS(p2 - p1) <= I
           && ABS(p1 - p0) <= I && ABS(q3 - q2) <= I
           && ABS(q2 - q1) <= I && ABS(q1 - q0) <= I;
}


//85
function
filter_common(pixels,
			  pixels_off,
              stride,
              use_outer_taps)
{
//var p3 = pixels[pixels_off -4*stride];
//var p2 = pixels[pixels_off -3*stride];
var p1 = pixels[pixels_off -2*stride];
var p0 = pixels[pixels_off -1*stride];
var q0 = pixels[pixels_off+ 0*stride];
var q1 = pixels[pixels_off+ 1*stride];
//var q2 = pixels[pixels_off+ 2*stride];
//var q3 = pixels[pixels_off+ 3*stride];
    var a=int_, f1=int_, f2=int_;

    a = 3 * (q0 - p0);

    if (use_outer_taps)
        a += saturate_int8(p1 - q1);

    a = saturate_int8(a);

    f1 = ((a + 4 > 127) ? 127 : a + 4) >> 3;
    f2 = ((a + 3 > 127) ? 127 : a + 3) >> 3;

    p0 = saturate_uint8(p0 + f2);
    q0 = saturate_uint8(q0 - f1);

    if (!use_outer_taps)
    {
        /* This handles the case of subblock_filter()
         * (from the bitstream guide.
         */
        a = (f1 + 1) >> 1;
        p1 = saturate_uint8(p1 + a);
        q1 = saturate_uint8(q1 - a);
    }
//pixels[pixels_off -4*stride] = p3;
//pixels[pixels_off -3*stride] = p2;
pixels[pixels_off -2*stride] = p1;
pixels[pixels_off -1*stride] = p0;
pixels[pixels_off+ 0*stride] = q0;
pixels[pixels_off+ 1*stride] = q1;
//pixels[pixels_off+ 2*stride] = q2;
//pixels[pixels_off+ 3*stride] = q3;
}

//117
function
filter_mb_edge(pixels,
			   pixels_off,
               stride)
{
//var p3 = pixels[pixels_off -4*stride];
var p2 = pixels[pixels_off -3*stride];
var p1 = pixels[pixels_off -2*stride];
var p0 = pixels[pixels_off -1*stride];
var q0 = pixels[pixels_off+ 0*stride];
var q1 = pixels[pixels_off+ 1*stride];
var q2 = pixels[pixels_off+ 2*stride];
//var q3 = pixels[pixels_off+ 3*stride];
    var w=int_, a=int_;

    w = saturate_int8(saturate_int8(p1 - q1) + 3 * (q0 - p0));

    a = (27 * w + 63) >> 7;
    p0 = saturate_uint8(p0 + a);
    q0 = saturate_uint8(q0 - a);

    a = (18 * w + 63) >> 7;
    p1 = saturate_uint8(p1 + a);
    q1 = saturate_uint8(q1 - a);

    a = (9 * w + 63) >> 7;
    p2 = saturate_uint8(p2 + a);
    q2 = saturate_uint8(q2 - a);

//pixels[pixels_off -4*stride] = p3;
pixels[pixels_off -3*stride] = p2;
pixels[pixels_off -2*stride] = p1;
pixels[pixels_off -1*stride] = p0;
pixels[pixels_off+ 0*stride] = q0;
pixels[pixels_off+ 1*stride] = q1;
pixels[pixels_off+ 2*stride] = q2;
//pixels[pixels_off+ 3*stride] = q3;
}


//140
function
filter_mb_v_edge(src,
				 src_off,
                 stride,
                 edge_limit,
                 interior_limit,
                 hev_threshold,
                 size)
{
    var i=int_;

    for (i = 0; i < 8 * size; i++)
    {
        if (normal_threshold(src, src_off, 1, edge_limit, interior_limit))
        {
            if (high_edge_variance(src, src_off, 1, hev_threshold))
                filter_common(src, src_off, 1, 1);
            else
                filter_mb_edge(src, src_off, 1);
        }

        src_off += stride;
    }
}


//165
function
filter_subblock_v_edge(src,
					   src_off,
                       stride,
                       edge_limit,
                       interior_limit,
                       hev_threshold,
                       size)
{
    var i=int_;

    for (i = 0; i < 8 * size; i++)
    {
        if (normal_threshold(src, src_off, 1, edge_limit, interior_limit))
            filter_common(src, src_off, 1,
                          high_edge_variance(src, src_off, 1, hev_threshold));

        src_off += stride;
    }
}


//186
function
filter_mb_h_edge(src,
				 src_off,
                 stride,
                 edge_limit,
                 interior_limit,
                 hev_threshold,
                 size)
{
    var i=int_;

    for (i = 0; i < 8 * size; i++)
    {
        if (normal_threshold(src, src_off, stride, edge_limit, interior_limit))
        {
            if (high_edge_variance(src, src_off, stride, hev_threshold))
                filter_common(src, src_off, stride, 1);
            else
                filter_mb_edge(src, src_off, stride);
        }

        src_off += 1;
    }
}


//211
function
filter_subblock_h_edge(src,
					   src_off,
                       stride,
                       edge_limit,
                       interior_limit,
                       hev_threshold,
                       size)
{
    var i=int_;

    for (i = 0; i < 8 * size; i++)
    {
        if (normal_threshold(src, src_off, stride, edge_limit, interior_limit))
            filter_common(src, src_off, stride,
                          high_edge_variance(src, src_off, stride,
                                             hev_threshold));

        src_off += 1;
    }
}


//233
function
filter_v_edge_simple(src,
					 src_off,
                     stride,
                     filter_limit)
{
    var i=int_;

    for (i = 0; i < 16; i++)
    {
        if (simple_threshold(src, src_off, 1, filter_limit))
            filter_common(src, src_off, 1, 1);

        src_off += stride;
    }
}


//250
function
filter_h_edge_simple(src,
					 src_off,
                     stride,
                     filter_limit)
{
    var i=int_;

    for (i = 0; i < 16; i++)
    {
        if (simple_threshold(src, src_off, stride, filter_limit))
            filter_common(src, src_off, stride, 1);

        src_off += 1;
    }
}


//267
function
calculate_filter_parameters(ctx,
                            mbi,
                            edge_limit_,
                            interior_limit_,
                            hev_threshold_)
{
    var filter_level=int_, interior_limit=int_, hev_threshold=int_;

    /* Reference code/spec seems to conflate filter_level and
     * edge_limit
     */

    filter_level = ctx.loopfilter_hdr.level;

    if (ctx.segment_hdr.enabled)
    {
        if (!ctx.segment_hdr.abs_)
            filter_level +=
                ctx.segment_hdr.lf_level[mbi.base.segment_id];
        else
            filter_level =
                ctx.segment_hdr.lf_level[mbi.base.segment_id];
    }

    if (ctx.loopfilter_hdr.delta_enabled)
    {
        filter_level +=
            ctx.loopfilter_hdr.ref_delta[mbi.base.ref_frame];

        if (mbi.base.ref_frame == CURRENT_FRAME)
        {
            if (mbi.base.y_mode == B_PRED)
                filter_level += ctx.loopfilter_hdr.mode_delta[0];
        }
        else if (mbi.base.y_mode == ZEROMV)
            filter_level += ctx.loopfilter_hdr.mode_delta[1];
        else if (mbi.base.y_mode == SPLITMV)
            filter_level += ctx.loopfilter_hdr.mode_delta[3];
        else
            filter_level += ctx.loopfilter_hdr.mode_delta[2];
    }

    if (filter_level > 63)
        filter_level = 63;
    else if (filter_level < 0)
        filter_level = 0;

    interior_limit = filter_level;

    if (ctx.loopfilter_hdr.sharpness)
    {
        interior_limit >>= ctx.loopfilter_hdr.sharpness > 4 ? 2 : 1;

        if (interior_limit > 9 - ctx.loopfilter_hdr.sharpness)
            interior_limit = 9 - ctx.loopfilter_hdr.sharpness;
    }

    if (interior_limit < 1)
        interior_limit = 1;

    hev_threshold = (filter_level >= 15);

    if (filter_level >= 40)
        hev_threshold++;

    if (filter_level >= 20 && !ctx.frame_hdr.is_keyframe)
        hev_threshold++;

    edge_limit_[0] = filter_level;
    interior_limit_[0] = interior_limit;
    hev_threshold_[0] = hev_threshold;
}


//342
function
filter_row_normal(ctx,
                  row,
                  start_col,
                  num_cols)
{
    var y=char_, u=char_, v=char_;
    var y_off=0, u_off=0, v_off=0;
    var stride=int_, uv_stride=int_;
    var mbi; var mbi_off=0;//='mb_info'
    var col=int_;

    /* Adjust pointers based on row, start_col */
    stride    = ctx.ref_frames[CURRENT_FRAME].img.stride[PLANE_Y];
    uv_stride = ctx.ref_frames[CURRENT_FRAME].img.stride[PLANE_U];
    y = ctx.ref_frames[CURRENT_FRAME].img.planes[PLANE_Y];
    y_off = ctx.ref_frames[CURRENT_FRAME].img.planes_off[PLANE_Y];
    u = ctx.ref_frames[CURRENT_FRAME].img.planes[PLANE_U];
    u_off = ctx.ref_frames[CURRENT_FRAME].img.planes_off[PLANE_U];
    v = ctx.ref_frames[CURRENT_FRAME].img.planes[PLANE_V];
    v_off = ctx.ref_frames[CURRENT_FRAME].img.planes_off[PLANE_V];
    y_off += (stride * row + start_col) * 16;
    u_off += (uv_stride * row + start_col) * 8;
    v_off += (uv_stride * row + start_col) * 8;
    mbi = ctx.mb_info_rows[1+ row]; mbi_off = ctx.mb_info_rows_off[1+ row] + start_col;

    for (col = start_col; col < start_col + num_cols; col++)
    {
        var edge_limit=[int_], interior_limit=[int_], hev_threshold=[int_];

        /* TODO: only need to recalculate every MB if segmentation is
         * enabled.
         */
        calculate_filter_parameters(ctx, mbi[mbi_off], edge_limit,
                                    interior_limit, hev_threshold);
		edge_limit=edge_limit[0], interior_limit=interior_limit[0], hev_threshold=hev_threshold[0];

        if (edge_limit)
        {
            if (col)
            {
                filter_mb_v_edge(y, y_off, stride, edge_limit + 2,
                                 interior_limit, hev_threshold, 2);
                filter_mb_v_edge(u, u_off, uv_stride, edge_limit + 2,
                                 interior_limit, hev_threshold, 1);
                filter_mb_v_edge(v, v_off, uv_stride, edge_limit + 2,
                                 interior_limit, hev_threshold, 1);
            }

            /* NOTE: This conditional is actually dependent on the
             * number of coefficients decoded, not the skip flag as
             * coded in the bitstream. The tokens task is expected to
             * set 31 if there is *any* non-zero data.
             */
            if (mbi[mbi_off].base.eob_mask
                || mbi[mbi_off].base.y_mode == SPLITMV
                || mbi[mbi_off].base.y_mode == B_PRED)
            {
                filter_subblock_v_edge(y, y_off + 4, stride, edge_limit,
                                       interior_limit, hev_threshold,
                                       2);
                filter_subblock_v_edge(y, y_off + 8, stride, edge_limit,
                                       interior_limit, hev_threshold,
                                       2);
                filter_subblock_v_edge(y, y_off + 12, stride, edge_limit,
                                       interior_limit, hev_threshold,
                                       2);
                filter_subblock_v_edge(u, y_off + 4, uv_stride, edge_limit,
                                       interior_limit, hev_threshold,
                                       1);
                filter_subblock_v_edge(v, y_off + 4, uv_stride, edge_limit,
                                       interior_limit, hev_threshold,
                                       1);
            }

            if (row)
            {
                filter_mb_h_edge(y, y_off, stride, edge_limit + 2,
                                 interior_limit, hev_threshold, 2);
                filter_mb_h_edge(u, u_off, uv_stride, edge_limit + 2,
                                 interior_limit, hev_threshold, 1);
                filter_mb_h_edge(v, v_off, uv_stride, edge_limit + 2,
                                 interior_limit, hev_threshold, 1);
            }

            if (mbi[mbi_off].base.eob_mask
                || mbi[mbi_off].base.y_mode == SPLITMV
                || mbi[mbi_off].base.y_mode == B_PRED)
            {
                filter_subblock_h_edge(y, y_off + 4 * stride, stride,
                                       edge_limit, interior_limit,
                                       hev_threshold, 2);
                filter_subblock_h_edge(y, y_off + 8 * stride, stride,
                                       edge_limit, interior_limit,
                                       hev_threshold, 2);
                filter_subblock_h_edge(y, y_off + 12 * stride, stride,
                                       edge_limit, interior_limit,
                                       hev_threshold, 2);
                filter_subblock_h_edge(u, u_off + 4 * uv_stride, uv_stride,
                                       edge_limit, interior_limit,
                                       hev_threshold, 1);
                filter_subblock_h_edge(v, v_off + 4 * uv_stride, uv_stride,
                                       edge_limit, interior_limit,
                                       hev_threshold, 1);
            }
        }

        y_off += 16;
        u_off += 8;
        v_off += 8;
        mbi_off++;
    }
}


//452
function
filter_row_simple(ctx,
                  row,
                  start_col,
                  num_cols)
{
    var y=char_; var y_off=0;
    var stride=int_;
    var mbi; var mbi_off=0;//='mb_info'
    var col=int_;

    /* Adjust pointers based on row, start_col */
    stride    = ctx.ref_frames[CURRENT_FRAME].img.stride[PLANE_Y];
    y = ctx.ref_frames[CURRENT_FRAME].img.planes[PLANE_Y];
    y_off = ctx.ref_frames[CURRENT_FRAME].img.planes_off[PLANE_Y];
    y_off += (stride * row + start_col) * 16;

    mbi = ctx.mb_info_rows[1+row]; mbi_off = ctx.mb_info_rows_off[1+row] + start_col;

    for (col = start_col; col < start_col + num_cols; col++)
    {
        var edge_limit=[int_], interior_limit=[int_], hev_threshold=[int_];

        /* TODO: only need to recalculate every MB if segmentation is
         * enabled.
         */
        calculate_filter_parameters(ctx, mbi[mbi_off], edge_limit,
                                    interior_limit, hev_threshold);

        if (edge_limit[0])
        {

            /* NOTE: This conditional is actually dependent on the
             * number of coefficients decoded, not the skip flag as
             * coded in the bitstream. The tokens task is expected to
             * set 31 if there is *any* non-zero data.
             */
            var filter_subblocks = (mbi[mbi_off].base.eob_mask
                                    || mbi[mbi_off].base.y_mode == SPLITMV
                                    || mbi[mbi_off].base.y_mode == B_PRED)+0;
            var mb_limit = (edge_limit[0] + 2) * 2 + interior_limit[0];
            var b_limit = edge_limit[0] * 2 + interior_limit[0];

            if (col)
                filter_v_edge_simple(y, y_off, stride, mb_limit);

            if (filter_subblocks)
            {
                filter_v_edge_simple(y, y_off + 4, stride, b_limit);
                filter_v_edge_simple(y, y_off + 8, stride, b_limit);
                filter_v_edge_simple(y, y_off + 12, stride, b_limit);
            }

            if (row)
                filter_h_edge_simple(y, y_off, stride, mb_limit);

            if (filter_subblocks)
            {
                filter_h_edge_simple(y, y_off + 4 * stride, stride, b_limit);
                filter_h_edge_simple(y, y_off + 8 * stride, stride, b_limit);
                filter_h_edge_simple(y, y_off + 12 * stride, stride, b_limit);
            }
        }

        y_off += 16;
        mbi_off++;
    }
}


//520
function
vp8_dixie_loopfilter_process_row(ctx,
                                 row,
                                 start_col,
                                 num_cols)
{
    if (ctx.loopfilter_hdr.use_simple)
        filter_row_simple(ctx, row, start_col, num_cols);
    else
        filter_row_normal(ctx, row, start_col, num_cols);
}


var
    BORDER_PIXELS     = 16
;


var sixtap_filters =//[8]
new Array(

    new Array( 0,  0,  128,    0,   0,  0 ),
    new Array( 0, -6,  123,   12,  -1,  0 ),
    new Array( 2, -11, 108,   36,  -8,  1 ),
    new Array( 0, -9,   93,   50,  -6,  0 ),
    new Array( 3, -16,  77,   77, -16,  3 ),
    new Array( 0, -6,   50,   93,  -9,  0 ),
    new Array( 1, -8,   36,  108, -11,  2 ),
    new Array( 0, -1,   12,  123,  -6,  0 )
);


var bilinear_filters =//filter_t [8]
new Array(

    new Array( 0,  0,  128,    0,   0,  0 ),
    new Array( 0,  0,  112,   16,   0,  0 ),
    new Array( 0,  0,   96,   32,   0,  0 ),
    new Array( 0,  0,   80,   48,   0,  0 ),
    new Array( 0,  0,   64,   64,   0,  0 ),
    new Array( 0,  0,   48,   80,   0,  0 ),
    new Array( 0,  0,   32,   96,   0,  0 ),
    new Array( 0,  0,   16,  112,   0,  0 )
);

//51
function
predict_h_nxn(predict,
			  predict_off,
              stride,
              n)
{
    var left = predict; var left_off = predict_off - 1;
    var i=int_, j=int_;

    for (i = 0; i < n; i++)
        for (j = 0; j < n; j++)
            predict[predict_off+ i *stride + j] = left[left_off+ i * stride];
}


//65
function
predict_v_nxn(predict,
			  predict_off,
              stride,
              n)
{
    var above = predict; var above_off = predict_off - stride;
    var i=int_, j=int_;

    for (i = 0; i < n; i++)
        for (j = 0; j < n; j++)
            predict[predict_off+ i *stride + j] = above[above_off+ j];
}


//79
function
predict_tm_nxn(predict,
			   predict_off,
               stride,
               n)
{
    /* Transposes the left column to the top row for later consumption
     * by the idct/recon stage
     */
    var left = predict; var left_off = predict_off - 1;
    var above = predict; var above_off = predict_off - stride;
    var  p = above[above_off -1];
    var  i=int_, j=int_;

    for (j = 0; j < n; j++)
    {
        for (i = 0; i < n; i++)
            predict[predict_off+ i] = CLAMP_255(left[left_off] + above[above_off+i] - p);//*left

        predict_off += stride;
        left_off += stride;
    }
}

//102
function
predict_dc_nxn(predict,
			   predict_off,
               stride,
               n)
{
    var left = predict; var left_off = predict_off - 1;
    var above = predict; var above_off = predict_off - stride;
    var         i=int_, j=int_; var dc = 0;

    for (i = 0; i < n; i++)
    {
        dc += left[left_off] + above[above_off+ i];//*left
        left_off += stride;
    }

    switch (n)
    {
    case 16:
        dc = (dc + 16) >> 5;
        break;
    case  8:
        dc = (dc + 8) >> 4;
        break;
    case  4:
        dc = (dc + 4) >> 3;
        break;
    }

    for (i = 0; i < n; i++)
        for (j = 0; j < n; j++)
            predict[predict_off+ i *stride + j] = dc;
}


//136
function
predict_ve_4x4(predict,
			   predict_off,
               stride)
{
    var above = predict; var above_off = predict_off - stride;
    var i=int_, j=int_;

    predict[predict_off+ 0] = (above[above_off -1] + 2 * above[above_off+ 0] + above[above_off+ 1] + 2) >> 2;
    predict[predict_off+ 1] = (above[above_off+ 0] + 2 * above[above_off+ 1] + above[above_off+ 2] + 2) >> 2;
    predict[predict_off+ 2] = (above[above_off+ 1] + 2 * above[above_off+ 2] + above[above_off+ 3] + 2) >> 2;
    predict[predict_off+ 3] = (above[above_off+ 2] + 2 * above[above_off+ 3] + above[above_off+ 4] + 2) >> 2;

    for (i = 1; i < 4; i++)
        for (j = 0; j < 4; j++)
            predict[predict_off+ i *stride + j] = predict[predict_off+ j];
}


//154
function
predict_he_4x4(predict,
			   predict_off,
               stride)
{
    var left = predict; var left_off = predict_off - 1;

    predict[predict_off+ 0] =
    predict[predict_off+ 1] =
    predict[predict_off+ 2] =
    predict[predict_off+ 3] = (left[left_off -stride] + 2 * left[left_off+ 0] + left[left_off+ stride] + 2) >> 2;
    predict_off += stride;
    left_off += stride;

    predict[predict_off+ 0] =
    predict[predict_off+ 1] =
    predict[predict_off+ 2] =
    predict[predict_off+ 3] = (left[left_off -stride] + 2 * left[left_off+ 0] + left[left_off+ stride] + 2) >> 2;
    predict_off += stride;
    left_off += stride;

    predict[predict_off+ 0] =
    predict[predict_off+ 1] =
    predict[predict_off+ 2] =
    predict[predict_off+ 3] = (left[left_off -stride] + 2 * left[left_off+ 0] + left[left_off+ stride] + 2) >> 2;
    predict_off += stride;
    left_off += stride;

    predict[predict_off+ 0] =
    predict[predict_off+ 1] =
    predict[predict_off+ 2] =
    predict[predict_off+ 3] = (left[left_off -stride] + 2 * left[left_off+ 0] + left[left_off+ 0] + 2) >> 2;
}


//188
function
predict_ld_4x4(predict,
			   predict_off,
               stride)
{
    var above = predict; var above_off = predict_off - stride;
    var pred0=int_, pred1=int_, pred2=int_, pred3=int_, pred4=int_, pred5=int_, pred6=int_;

    predict[predict_off+ 0] = pred0 = (above[above_off+ 0] + 2 * above[above_off+ 1] + above[above_off+ 2] + 2) >> 2;
    predict[predict_off+ 1] = pred1 = (above[above_off+ 1] + 2 * above[above_off+ 2] + above[above_off+ 3] + 2) >> 2;
    predict[predict_off+ 2] = pred2 = (above[above_off+ 2] + 2 * above[above_off+ 3] + above[above_off+ 4] + 2) >> 2;
    predict[predict_off+ 3] = pred3 = (above[above_off+ 3] + 2 * above[above_off+ 4] + above[above_off+ 5] + 2) >> 2;
    predict_off += stride;

    predict[predict_off+ 0] = pred1;
    predict[predict_off+ 1] = pred2;
    predict[predict_off+ 2] = pred3;
    predict[predict_off+ 3] = pred4 = (above[above_off+ 4] + 2 * above[above_off+ 5] + above[above_off+ 6] + 2) >> 2;
    predict_off += stride;

    predict[predict_off+ 0] = pred2;
    predict[predict_off+ 1] = pred3;
    predict[predict_off+ 2] = pred4;
    predict[predict_off+ 3] = pred5 = (above[above_off+ 5] + 2 * above[above_off+ 6] + above[above_off+ 7] + 2) >> 2;
    predict_off += stride;

    predict[predict_off+ 0] = pred3;
    predict[predict_off+ 1] = pred4;
    predict[predict_off+ 2] = pred5;
    predict[predict_off+ 3] = pred6 = (above[above_off+ 6] + 2 * above[above_off+ 7] + above[above_off+ 7] + 2) >> 2;
}


//220
function
predict_rd_4x4(predict,
			   predict_off,
               stride)
{
    var left = predict; var left_off = predict_off - 1;
    var above = predict; var above_off = predict_off - stride;
    var pred0=int_, pred1=int_, pred2=int_, pred3=int_, pred4=int_, pred5=int_, pred6=int_;

    predict[predict_off+ 0] = pred0 =
        (left[left_off+ 0] + 2 * above[above_off -1] + above[above_off+ 0] + 2) >> 2;
    predict[predict_off+ 1] = pred1 =
        (above[above_off -1] + 2 * above[above_off+ 0] + above[above_off+ 1] + 2) >> 2;
    predict[predict_off+ 2] = pred2 =
        (above[above_off+ 0] + 2 * above[above_off+ 1] + above[above_off+ 2] + 2) >> 2;
    predict[predict_off+ 3] = pred3 =
        (above[above_off+ 1] + 2 * above[above_off+ 2] + above[above_off+ 3] + 2) >> 2;
    predict_off += stride;

    predict[predict_off+ 0] = pred4 =
        (left[left_off+ stride] + 2 * left[left_off+ 0] + above[above_off -1] + 2) >> 2;
    predict[predict_off+ 1] = pred0;
    predict[predict_off+ 2] = pred1;
    predict[predict_off+ 3] = pred2;
    predict_off += stride;

    predict[predict_off+ 0] = pred5 =
        (left[left_off+ stride*2] + 2 * left[left_off+ stride] + left[left_off+ 0] + 2) >> 2;
    predict[predict_off+ 1] = pred4;
    predict[predict_off+ 2] = pred0;
    predict[predict_off+ 3] = pred1;
    predict_off += stride;

    predict[predict_off+ 0] = pred6 =
        (left[left_off+ stride*3] + 2 * left[left_off+ stride*2] + left[left_off+ stride] + 2) >> 2;
    predict[predict_off+ 1] = pred5;
    predict[predict_off+ 2] = pred4;
    predict[predict_off+ 3] = pred0;
}


//260
function
predict_vr_4x4(predict,
			   predict_off,
               stride)
{
    var left = predict; var left_off = predict_off - 1;
    var above = predict; var above_off = predict_off - stride;
                var pred0=int_, pred1=int_, pred2=int_, pred3=int_, pred4=int_, pred5=int_, pred6=int_,
                   pred7=int_, pred8=int_, pred9=int_;

    predict[predict_off+ 0] = pred0 = (above[above_off -1] + above[above_off+ 0] + 1) >> 1;
    predict[predict_off+ 1] = pred1 = (above[above_off+ 0] + above[above_off+ 1] + 1) >> 1;
    predict[predict_off+ 2] = pred2 = (above[above_off+ 1] + above[above_off+ 2] + 1) >> 1;
    predict[predict_off+ 3] = pred3 = (above[above_off+ 2] + above[above_off+ 3] + 1) >> 1;
    predict_off += stride;

    predict[predict_off+ 0] = pred4 =
        (left[left_off+ 0] + 2 * above[above_off -1] + above[above_off+ 0] + 2) >> 2;
    predict[predict_off+ 1] = pred5 =
        (above[above_off -1] + 2 * above[above_off+ 0] + above[above_off+ 1] + 2) >> 2;
    predict[predict_off+ 2] = pred6 =
        (above[above_off+ 0] + 2 * above[above_off+ 1] + above[above_off+ 2] + 2) >> 2;
    predict[predict_off+ 3] = pred7 =
        (above[above_off+ 1] + 2 * above[above_off+ 2] + above[above_off+ 3] + 2) >> 2;
    predict_off += stride;

    predict[predict_off+ 0] = pred8 =
        (left[left_off+ stride] + 2 * left[left_off+ 0] + above[above_off -1] + 2) >> 2;
    predict[predict_off+ 1] = pred0;
    predict[predict_off+ 2] = pred1;
    predict[predict_off+ 3] = pred2;
    predict_off += stride;

    predict[predict_off+ 0] = pred9 =
        (left[left_off+ stride*2] + 2 * left[left_off+ stride] + left[left_off+ 0] + 2) >> 2;
    predict[predict_off+ 1] = pred4;
    predict[predict_off+ 2] = pred5;
    predict[predict_off+ 3] = pred6;
}


//300
function
predict_vl_4x4(predict,
			   predict_off,
               stride)
{
    var above = predict; var above_off = predict_off - stride;
    var pred0=int_, pred1=int_, pred2=int_, pred3=int_, pred4=int_, pred5=int_, pred6=int_,
        pred7=int_, pred8=int_, pred9=int_;

    predict[predict_off+ 0] = pred0 = (above[above_off+ 0] + above[above_off+ 1] + 1) >> 1;
    predict[predict_off+ 1] = pred1 = (above[above_off+ 1] + above[above_off+ 2] + 1) >> 1;
    predict[predict_off+ 2] = pred2 = (above[above_off+ 2] + above[above_off+ 3] + 1) >> 1;
    predict[predict_off+ 3] = pred3 = (above[above_off+ 3] + above[above_off+ 4] + 1) >> 1;
    predict_off += stride;

    predict[predict_off+ 0] = pred4 =
        (above[above_off+ 0] + 2 * above[above_off+ 1] + above[above_off+ 2] + 2) >> 2;
    predict[predict_off+ 1] = pred5 =
        (above[above_off+ 1] + 2 * above[above_off+ 2] + above[above_off+ 3] + 2) >> 2;
    predict[predict_off+ 2] = pred6 =
        (above[above_off+ 2] + 2 * above[above_off+ 3] + above[above_off+ 4] + 2) >> 2;
    predict[predict_off+ 3] = pred7 =
        (above[above_off+ 3] + 2 * above[above_off+ 4] + above[above_off+ 5] + 2) >> 2;
    predict_off += stride;

    predict[predict_off+ 0] = pred1;
    predict[predict_off+ 1] = pred2;
    predict[predict_off+ 2] = pred3;
    predict[predict_off+ 3] = pred8 = (above[above_off+ 4] + 2 * above[above_off+ 5] + above[above_off+ 6] + 2) >> 2;
    predict_off += stride;

    predict[predict_off+ 0] = pred5;
    predict[predict_off+ 1] = pred6;
    predict[predict_off+ 2] = pred7;
    predict[predict_off+ 3] = pred9 = (above[above_off+ 5] + 2 * above[above_off+ 6] + above[above_off+ 7] + 2) >> 2;
}


//337
function
predict_hd_4x4(predict,
			   predict_off,
               stride)
{
    var left = predict; var left_off = predict_off - 1;
    var above = predict; var above_off = predict_off - stride;
    var pred0=int_, pred1=int_, pred2=int_, pred3=int_, pred4=int_, pred5=int_, pred6=int_,
        pred7=int_, pred8=int_, pred9=int_;

    predict[predict_off+ 0] = pred0 =
        (left[left_off+ 0] + above[above_off -1] + 1) >> 1;
    predict[predict_off+ 1] = pred1 =
        (left[left_off+ 0] + 2 * above[above_off -1] + above[above_off+ 0] + 2) >> 2;
    predict[predict_off+ 2] = pred2 =
        (above[above_off -1] + 2 * above[above_off+ 0] + above[above_off+ 1] + 2) >> 2;
    predict[predict_off+ 3] = pred3 =
        (above[above_off+ 0] + 2 * above[above_off+ 1] + above[above_off+ 2] + 2) >> 2;
    predict_off += stride;

    predict[predict_off+ 0] = pred4 =
        (left[left_off+ stride] + left[left_off+ 0] + 1) >> 1;
    predict[predict_off+ 1] = pred5 =
        (left[left_off+ stride] + 2 * left[left_off+ 0] + above[above_off -1] + 2) >> 2;
    predict[predict_off+ 2] = pred0;
    predict[predict_off+ 3] = pred1;
    predict_off += stride;

    predict[predict_off+ 0] = pred6 =
        (left[left_off+ stride*2] +   left[left_off+ stride] + 1) >> 1;
    predict[predict_off+ 1] = pred7 =
        (left[left_off+ stride*2] + 2 * left[left_off+ stride] + left[left_off+ 0] + 2) >> 2;
    predict[predict_off+ 2] = pred4;
    predict[predict_off+ 3] = pred5;
    predict_off += stride;

    predict[predict_off+ 0] = pred8 =
        (left[left_off+ stride*3] +   left[left_off+ stride*2] + 1) >> 1;
    predict[predict_off+ 1] = pred9 =
        (left[left_off+ stride*3] + 2 * left[left_off+ stride*2] + left[left_off+ stride] + 2) >> 2;
    predict[predict_off+ 2] = pred6;
    predict[predict_off+ 3] = pred7;
}


//381
function
predict_hu_4x4(predict,
			   predict_off,
               stride)
{
    var left = predict; var left_off = predict_off - 1;
    var pred0=int_, pred1=int_, pred2=int_, pred3=int_, pred4=int_, pred5=int_, pred6=int_;

    predict[predict_off+ 0] = pred0 =
        (left[left_off+ stride*0] +   left[left_off+ stride*1] + 1) >> 1;
    predict[predict_off+ 1] = pred1 =
        (left[left_off+ stride*0] + 2 * left[left_off+ stride*1] + left[left_off+ stride*2] + 2) >> 2;
    predict[predict_off+ 2] = pred2 =
        (left[left_off+ stride*1] +   left[left_off+ stride*2] + 1) >> 1;
    predict[predict_off+ 3] = pred3 =
        (left[left_off+ stride*1] + 2 * left[left_off+ stride*2] + left[left_off+ stride*3] + 2) >> 2;
    predict_off += stride;

    predict[predict_off+ 0] = pred2;
    predict[predict_off+ 1] = pred3;
    predict[predict_off+ 2] = pred4 =
        (left[left_off+ stride*2] + left[left_off+ stride*3] + 1) >> 1;
    predict[predict_off+ 3] = pred5 =
        (left[left_off+ stride*2] + 2 * left[left_off+ stride*3] + left[left_off+ stride*3] + 2) >> 2;
    predict_off += stride;

    predict[predict_off+ 0] = pred4;
    predict[predict_off+ 1] = pred5;
    predict[predict_off+ 2] = pred6 = left[left_off+ stride*3];
    predict[predict_off+ 3] = pred6;
    predict_off += stride;

    predict[predict_off+ 0] = pred6;
    predict[predict_off+ 1] = pred6;
    predict[predict_off+ 2] = pred6;
    predict[predict_off+ 3] = pred6;
}


//419
function
predict_h_16x16(predict, predict_off, stride)
{
    predict_h_nxn(predict, predict_off, stride, 16);
}


//426
function
predict_v_16x16(predict, predict_off, stride)
{
    predict_v_nxn(predict, predict_off, stride, 16);
}


//433
function
predict_tm_16x16(predict, predict_off, stride)
{
    predict_tm_nxn(predict, predict_off, stride, 16);
}


//440
function
predict_h_8x8(predict, predict_off, stride)
{
    predict_h_nxn(predict, predict_off, stride, 8);
}


//447
function
predict_v_8x8(predict, predict_off, stride)
{
    predict_v_nxn(predict, predict_off, stride, 8);
}


//454
function
predict_tm_8x8(predict, predict_off, stride)
{
    predict_tm_nxn(predict, predict_off, stride, 8);
}


//461
function
predict_tm_4x4(predict, predict_off, stride)
{
    predict_tm_nxn(predict, predict_off, stride, 4);
}

var tmp_4=new Array(0,0,0,0);//4
//468
function
copy_down(recon,
		  recon_off,
          stride)
{
    /* Copy the four pixels above-right of subblock 3 to
     * above-right of subblocks 7, 11, and 15
     */
    var /*uint32_t,*/ tmp_off=0, copy = (recon); var copy_off = (recon_off + 16 - stride);//*(void *)

    //stride = stride / sizeof(unsigned int);
	var i;
	for(i=0;i<4;++i)
    tmp_4[tmp_off+i] = copy[copy_off+i];
    copy_off += stride * 4;
	for(i=0;i<4;++i)
    copy[copy_off+i] = tmp_4[tmp_off+i];
    copy_off += stride * 4;
	for(i=0;i<4;++i)
    copy[copy_off+i] = tmp_4[tmp_off+i];
    copy_off += stride * 4;
	for(i=0;i<4;++i)
    copy[copy_off+i] = tmp_4[tmp_off+i];
}


//488
function
b_pred(predict,
	   predict_off,
       stride,
       mbi,
       coeffs,
	   coeffs_off)
{
    var i=int_;

    copy_down(predict, predict_off, stride);

    for (i = 0; i < 16; i++)
    {
        var b_predict = predict; var b_predict_off = predict_off + (i & 3) * 4;//*

        switch (mbi.splitt.mvs[i].d.x)
        {
        case B_DC_PRED:
            predict_dc_nxn(b_predict, b_predict_off, stride, 4);
            break;
        case B_TM_PRED:
            predict_tm_4x4(b_predict, b_predict_off, stride);
            break;
        case B_VE_PRED:
            predict_ve_4x4(b_predict, b_predict_off, stride);
            break;
        case B_HE_PRED:
            predict_he_4x4(b_predict, b_predict_off, stride);
            break;
        case B_LD_PRED:
            predict_ld_4x4(b_predict, b_predict_off, stride);
            break;
        case B_RD_PRED:
            predict_rd_4x4(b_predict, b_predict_off, stride);
            break;
        case B_VR_PRED:
            predict_vr_4x4(b_predict, b_predict_off, stride);
            break;
        case B_VL_PRED:
            predict_vl_4x4(b_predict, b_predict_off, stride);
            break;
        case B_HD_PRED:
            predict_hd_4x4(b_predict, b_predict_off, stride);
            break;
        case B_HU_PRED:
            predict_hu_4x4(b_predict, b_predict_off, stride);
            break;
        default:
            assert(0);
        }

        vp8_dixie_idct_add(b_predict, b_predict_off, b_predict, b_predict_off, stride, coeffs, coeffs_off);
        coeffs_off += 16;

        if ((i & 3) == 3)
        {
            predict_off += stride * 4;
        }
    }
}

var y2_16=Arr(16,0);
//549
function
fixup_dc_coeffs(mbi,
                coeffs,
				coeffs_off)
{
    /*Arr(16,short_);*/ var y2_off=0;
    var i=int_;

    vp8_dixie_walsh(coeffs, coeffs_off + 24 * 16, y2_16, y2_off);

    for (i = 0; i < 16; i++)
        coeffs[coeffs_off+ i*16] = y2_16[i];//no y2_off need
}


//563
function
predict_intra_luma(predict,
				   predict_off,
                   stride,
                   mbi,
                   coeffs,
				   coeffs_off)
{
    if (mbi.base.y_mode == B_PRED)
        b_pred(predict, predict_off, stride, mbi, coeffs, coeffs_off);
    else
    {
        var i=int_;

        switch (mbi.base.y_mode)
        {
        case DC_PRED:
            predict_dc_nxn(predict, predict_off, stride, 16);
            break;
        case V_PRED:
            predict_v_16x16(predict, predict_off, stride);
            break;
        case H_PRED:
            predict_h_16x16(predict, predict_off, stride);
            break;
        case TM_PRED:
            predict_tm_16x16(predict, predict_off, stride);
            break;
        default:
            assert(0);
        }

        fixup_dc_coeffs(mbi, coeffs, coeffs_off);

        for (i = 0; i < 16; i++)
        {
            vp8_dixie_idct_add(predict, predict_off, predict, predict_off, stride, coeffs, coeffs_off);
            coeffs_off += 16;
            predict_off += 4;

            if ((i & 3) == 3)
                predict_off += stride * 4 - 16;
        }

    }
}


//609
function
predict_intra_chroma(predict_u,
					 predict_u_off,
                     predict_v,
					 predict_v_off,
                     stride,
                     mbi,
                     coeffs,
					 coeffs_off)
{
    var i=int_;

    switch (mbi.base.uv_mode)
    {
    case DC_PRED:
        predict_dc_nxn(predict_u, predict_u_off, stride, 8);
        predict_dc_nxn(predict_v, predict_v_off, stride, 8);
        break;
    case V_PRED:
        predict_v_8x8(predict_u, predict_u_off, stride);
        predict_v_8x8(predict_v, predict_v_off, stride);
        break;
    case H_PRED:
        predict_h_8x8(predict_u, predict_u_off, stride);
        predict_h_8x8(predict_v, predict_v_off, stride);
        break;
    case TM_PRED:
        predict_tm_8x8(predict_u, predict_u_off, stride);
        predict_tm_8x8(predict_v, predict_v_off, stride);
        break;
    default:
        assert(0);
    }

    coeffs_off += 16 * 16;

    for (i = 16; i < 20; i++)
    {
        vp8_dixie_idct_add(predict_u, predict_u_off, predict_u, predict_u_off, stride, coeffs, coeffs_off);
        coeffs_off += 16;
        predict_u_off += 4;

        if (i & 1)
            predict_u_off += stride * 4 - 8;
    }

    for (i = 20; i < 24; i++)
    {
        vp8_dixie_idct_add(predict_v, predict_v_off, predict_v, predict_v_off, stride, coeffs, coeffs_off);
        coeffs_off += 16;
        predict_v_off += 4;

        if (i & 1)
            predict_v_off += stride * 4 - 8;
    }

}


//665
function
sixtap_horiz(output,
             output_off,
             output_stride,
             reference,
             reference_off,
             reference_stride,
             cols,
             rows,
             filter
            )
{
    var r=int_, c=int_, temp=int_;

    for (r = 0; r < rows; r++)
    {
        for (c = 0; c < cols; c++)
        {
            temp = (reference[reference_off -2] * filter[0]) +
                   (reference[reference_off -1] * filter[1]) +
                   (reference[reference_off+ 0] * filter[2]) +
                   (reference[reference_off+ 1] * filter[3]) +
                   (reference[reference_off+ 2] * filter[4]) +
                   (reference[reference_off+ 3] * filter[5]) +
                   64;
            temp >>= 7;
            output[output_off+ c] = (temp);//CLAMP_255
            reference_off++;
        }

        reference_off += reference_stride - cols;
        output_off += output_stride;
    }
}


//699
function
sixtap_vert(output,
            output_off,
            output_stride,
            reference,
            reference_off,
            reference_stride,
            cols,
            rows,
            filter
           )
{
    var r=int_, c=int_, temp=int_;

    for (r = 0; r < rows; r++)
    {
        for (c = 0; c < cols; c++)
        {
            temp = (reference[reference_off -2*reference_stride] * filter[0]) +
                   (reference[reference_off -1*reference_stride] * filter[1]) +
                   (reference[reference_off+ 0*reference_stride] * filter[2]) +
                   (reference[reference_off+ 1*reference_stride] * filter[3]) +
                   (reference[reference_off+ 2*reference_stride] * filter[4]) +
                   (reference[reference_off+ 3*reference_stride] * filter[5]) +
                   64;
            temp >>= 7;
            output[output_off+ c] = (temp);//CLAMP_255
            reference_off++;
        }

        reference_off += reference_stride - cols;
        output_off += output_stride;
    }
}


    var temp_=new Array(16*(16+5));//Arr(16*(16+5),char_);// DECLARE_ALIGNED(16, unsigned char, temp[16*(16+5)]);
//733
function
sixtap_2d(output,
		  output_off,
          output_stride,
          reference,
		  reference_off,
          reference_stride,
          cols,
          rows,
          mx,
          my,
          filters
         )
{

    sixtap_horiz(temp_, 0, 16,
                 reference, reference_off - 2 * reference_stride, reference_stride,
                 cols, rows + 5, filters[mx]);
    sixtap_vert(output, output_off, output_stride,
                temp_, + 2 * 16, 16,
                cols, rows, filters[my]);
}


var img_index = function()
{
    this.y=char_, this.u=char_, this.v=char_,
    this.y_off=0, this.u_off=0, this.v_off=0,
    this.stride=int_, this.uv_stride=int_
};


//763
function // *
filter_block(return_off,
			 output,
			 output_off,
             reference,
			 reference_off,
             stride,
             mv_,
             filters)
{
    var mx=int_, my=int_;

    /* Handle 0,0 as a special case. TODO: does this make it any
     * faster?
     */
    if (!mv_.d.x && !mv_.d.y) {//.raw
        return_off[0]=reference_off;
        return reference;
	}

    mx = mv_.d.x & 7;
    my = mv_.d.y & 7;
    reference_off += ((mv_.d.y >> 3) * stride) + (mv_.d.x >> 3);

    if (mx | my)
    {
        sixtap_2d(output, output_off, stride, reference, reference_off, stride, 4, 4, mx, my,
                  filters);
        reference = output; reference_off = output_off;
    }
	
	return_off[0]=reference_off;
    return reference;
}


//793
function
recon_1_block(output,
			  output_off,
              reference,
			  reference_off,
              stride,
              mv,
              filters,
              coeffs,
			  coeffs_off,
              mbi,
              b
             )
{
    var predict=char_; var predict_off=0; var filter_block_return_off=[0];

    predict = filter_block(filter_block_return_off, output, output_off, reference, reference_off, stride, mv, filters);
	predict_off = filter_block_return_off[0];
    vp8_dixie_idct_add(output, output_off, predict, predict_off, stride, coeffs,  coeffs_off + 16 * b);
}


//811
function
calculate_chroma_splitmv(mbi,
                         b,
                         full_pixel)
{
    var temp=int_;
    var mv_=new mv();

    temp = mbi.splitt.mvs[b].d.x +
           mbi.splitt.mvs[b+1].d.x +
           mbi.splitt.mvs[b+4].d.x +
           mbi.splitt.mvs[b+5].d.x;

    if (temp < 0)
        temp -= 4;
    else
        temp += 4;

    mv_.d.x = parseInt(temp / 8,10);

    temp = mbi.splitt.mvs[b].d.y +
           mbi.splitt.mvs[b+1].d.y +
           mbi.splitt.mvs[b+4].d.y +
           mbi.splitt.mvs[b+5].d.y;

    if (temp < 0)
        temp -= 4;
    else
        temp += 4;

    mv_.d.y = parseInt(temp / 8,10);

    if (full_pixel)
    {
        mv_.d.x &= ~7;
        mv_.d.y &= ~7;
    }

    return mv_;
}


/* Note: We rely on the reconstructed border having the same stride as
 * the reference buffer because the filter_block can't adjust the
 * stride with its return value, only the reference pointer.
 */
//857
function
build_mc_border(dst,
				dst_off,
                src,
				src_off,
                stride,
                x,
                y,
                b_w,
                b_h,
                w,
                h
               )
{
    var ref_row=char_; var ref_row_off=char_;


    /* Get a pointer to the start of the real data for this row */
    ref_row = src; ref_row_off = src_off - x - y * stride;

    if (y >= h)
        ref_row_off += (h - 1) * stride;
    else if (y > 0)
        ref_row_off += y * stride;

    do
    {
        var left=int_, right = 0, copy=int_;

        left = x < 0 ? -x : 0;

        if (left > b_w)
            left = b_w;

        if (x + b_w > w)
            right = x + b_w - w;

        if (right > b_w)
            right = b_w;

        copy = b_w - left - right;

        if (left)
            memset(dst, dst_off, ref_row[ref_row_off+ 0], left);

        if (copy)
            memcpy(dst, dst_off + left, ref_row, ref_row_off + x + left, copy);

        if (right)
            memset(dst, dst_off + left + copy, ref_row[ref_row_off+ w-1], right);

        dst_off += stride;
        y++;

        if (y < h && y > 0)
            ref_row_off += stride;
    }
    while (--b_h);
}


//916
function
recon_1_edge_block(output,
				   output_off,
                   emul_block,
				   emul_block_off,
                   reference,
				   reference_off,
                   stride,
                   mv_,
                   filters,
                   coeffs,
				   coeffs_off,
                   mbi,
                   x,
                   y,
                   w,
                   h,
                   start_b
                  )
{
    var predict=char_; var predict_off=0;
    var b = start_b;
    var b_w = 4;
    var b_h = 4;

    x += mv_.d.x >> 3;
    y += mv_.d.y >> 3;

    /* Need two pixels left/above, 3 right/below for 6-tap */
    if (x < 2 || x + b_w - 1 + 3 >= w || y < 2 || y + b_h - 1 + 3 >= h)
    {
        reference_off += (mv_.d.x >> 3) + (mv_.d.y >> 3) * stride;
        build_mc_border(emul_block, emul_block_off,
                        reference, reference_off - 2 - 2 * stride, stride,
                        x - 2, y - 2, b_w + 5, b_h + 5, w, h);
        reference = emul_block; reference_off = emul_block_off + 2 * stride + 2;
        reference_off -= (mv_.d.x >> 3) + (mv_.d.y >> 3) * stride;
    } var filter_block_return_off=[0];

    predict = filter_block(filter_block_return_off, output, output_off, reference, reference_off, stride, mv_, filters);
	predict_off = filter_block_return_off[0];
    vp8_dixie_idct_add(output, output_off, predict, predict_off, stride, coeffs, coeffs_off + 16 * b);
}

var uvmv_1=new mv();
//956
function
predict_inter_emulated_edge(ctx,
                            img,
                            coeffs,
                            coeffs_off,
                            mbi,
                            mb_col,
                            mb_row)
{
    /* TODO: move this into its own buffer. This only works because we
     * still have a border allocated.
     */
    var emul_block = ctx.frame_strg[0].img.img_data; var emul_block_off = ctx.frame_strg[0].img.img_data_off;
    var reference=char_; var reference_off=0;
    var output=char_; var output_off=0;
    var reference_offset=ptrdiff_t;
    var w=int_, h=int_, x=int_, y=int_, b=int_;
    var chroma_mv=Arr_new(4,mv);
    var u = img.u, v = img.v; var u_off = img.u_off, v_off = img.v_off;
    var full_pixel = (ctx.frame_hdr.version == 3)+0;


    x = mb_col * 16;
    y = mb_row * 16;
    w = ctx.mb_cols * 16;
    h = ctx.mb_rows * 16;
    output = img.y; output_off = img.y_off;
    reference_offset = ctx.ref_frame_offsets[mbi.base.ref_frame]; reference = ctx.ref_frame_offsets_[mbi.base.ref_frame];
    /*reference = output;*/ reference_off = output_off + reference_offset;

    if (mbi.base.y_mode != SPLITMV)
    {
        var uvmv=uvmv_1;

        uvmv.d.x = mbi.base.mv.d.x;uvmv.d.y = mbi.base.mv.d.y;
        uvmv.d.x = (uvmv.d.x + 1/* + (uvmv.d.x >> 31) * 2*/) >> 1;
        uvmv.d.y = (uvmv.d.y + 1/* + (uvmv.d.y >> 31) * 2*/) >> 1;

        if (full_pixel)
        {
            uvmv.d.x &= ~7;
            uvmv.d.y &= ~7;
        }

        chroma_mv[0].d.x = uvmv.d.x; chroma_mv[0].d.y = uvmv.d.y;//todo: set pointer or copy?
        chroma_mv[1].d.x = uvmv.d.x; chroma_mv[1].d.y = uvmv.d.y;
        chroma_mv[2].d.x = uvmv.d.x; chroma_mv[2].d.y = uvmv.d.y;
        chroma_mv[3].d.x = uvmv.d.x; chroma_mv[3].d.y = uvmv.d.y;
    }
    else
    {
        chroma_mv[0] = calculate_chroma_splitmv(mbi,  0, full_pixel);
        chroma_mv[1] = calculate_chroma_splitmv(mbi,  2, full_pixel);
        chroma_mv[2] = calculate_chroma_splitmv(mbi,  8, full_pixel);
        chroma_mv[3] = calculate_chroma_splitmv(mbi, 10, full_pixel);
    }


    /* Luma */
    for (b = 0; b < 16; b++)
    {
        var ymv;//='mv'

        if (mbi.base.y_mode != SPLITMV)
            ymv = mbi.base.mv;
        else
            ymv = mbi.splitt.mvs[ + b];

        recon_1_edge_block(output, output_off, emul_block, emul_block_off, reference, reference_off, img.stride,
                           ymv, ctx.subpixel_filters,
                           coeffs, coeffs_off, mbi, x, y, w, h, b);

        x += 4;
        output_off += 4;
        reference_off += 4;

        if ((b & 3) == 3)
        {
            x -= 16;
            y += 4;
            output_off += 4 * img.stride - 16;
            reference_off += 4 * img.stride - 16;
        }
    }

    x = mb_col * 16;
    y = mb_row * 16;

    /* Chroma */
    x >>= 1;
    y >>= 1;
    w >>= 1;
    h >>= 1;

    for (b = 0; b < 4; b++)
    {
        recon_1_edge_block(u, u_off, emul_block, emul_block_off, reference, u_off + reference_offset,//u
                           img.uv_stride,
                           chroma_mv[b], ctx.subpixel_filters,
                           coeffs, coeffs_off, mbi, x, y, w, h, b + 16);
        recon_1_edge_block(v, v_off, emul_block, emul_block_off, reference, v_off + reference_offset,//v
                           img.uv_stride,
                           chroma_mv[b], ctx.subpixel_filters,
                           coeffs, coeffs_off, mbi, x, y, w, h, b + 20);
        u_off += 4;
        v_off += 4;
        x += 4;

        if (b & 1)
        {
            x -= 8;
            y += 4;
            u_off += 4 * img.uv_stride - 8;
            v_off += 4 * img.uv_stride - 8;
        }
    }

}

var uvmv_2=new mv();
//1074
function
predict_inter(ctx,
              img,
              coeffs,
			  coeffs_off,
              mbi)
{
    var y = img.y; var y_off = img.y_off;
    var u = img.u; var u_off = img.u_off;
    var v = img.v; var v_off = img.v_off;
    var reference; var reference_offset=ptrdiff_t;
    var chroma_mv=Arr_new(4,mv);
    var full_pixel = (ctx.frame_hdr.version == 3)+0;
    var b=int_;

    if (mbi.base.y_mode != SPLITMV)
    {
        var uvmv=uvmv_2;

        uvmv.d.x = mbi.base.mv.d.x;uvmv.d.y = mbi.base.mv.d.y;
        uvmv.d.x = (uvmv.d.x + 1/* + (uvmv.d.x >> 31) * 2*/) >> 1;
        uvmv.d.y = (uvmv.d.y + 1/* + (uvmv.d.y >> 31) * 2*/) >> 1;

        if (full_pixel)
        {
            uvmv.d.x &= ~7;
            uvmv.d.y &= ~7;
        }

        chroma_mv[0].d.x =
            chroma_mv[1].d.x =
                chroma_mv[2].d.x =
                    chroma_mv[3].d.x = uvmv.d.x;
        chroma_mv[0].d.y =
            chroma_mv[1].d.y =
                chroma_mv[2].d.y =
                    chroma_mv[3].d.y = uvmv.d.y;
    }
    else
    {
        chroma_mv[0] = calculate_chroma_splitmv(mbi,  0, full_pixel);
        chroma_mv[1] = calculate_chroma_splitmv(mbi,  2, full_pixel);
        chroma_mv[2] = calculate_chroma_splitmv(mbi,  8, full_pixel);
        chroma_mv[3] = calculate_chroma_splitmv(mbi, 10, full_pixel);
    }

    reference_offset = ctx.ref_frame_offsets[mbi.base.ref_frame];reference = ctx.ref_frame_offsets_[mbi.base.ref_frame];

    for (b = 0; b < 16; b++)
    {
        var ymv;//='mv'

        if (mbi.base.y_mode != SPLITMV)
            ymv = mbi.base.mv;
        else
            ymv = mbi.splitt.mvs[ + b];//newObjectI()


        recon_1_block(y, y_off, reference, y_off + reference_offset, img.stride,//y
                      ymv, ctx.subpixel_filters, coeffs, coeffs_off, mbi, b);
        y_off += 4;

        if ((b & 3) == 3)
            y_off += 4 * img.stride - 16;
    }

    for (b = 0; b < 4; b++)
    {
        recon_1_block(u, u_off, reference, u_off + reference_offset,//u
                      img.uv_stride, chroma_mv[b],
                      ctx.subpixel_filters, coeffs, coeffs_off, mbi, b + 16);
        recon_1_block(v, v_off, reference, v_off + reference_offset,//v
                      img.uv_stride, chroma_mv[b],
                      ctx.subpixel_filters, coeffs, coeffs_off, mbi, b + 20);
        u_off += 4;
        v_off += 4;

        if (b & 1)
        {
            u_off += 4 * img.uv_stride - 8;
            v_off += 4 * img.uv_stride - 8;
        }
    }
}


//1155
function
vp8_dixie_release_ref_frame(rcimg)
{
    if (rcimg)
    {
        assert(rcimg.ref_cnt);
        rcimg.ref_cnt--;
    }
}


function
vp8_dixie_ref_frame(rcimg)
{
    rcimg.ref_cnt++;
    return rcimg;
}

//1174
function
vp8_dixie_find_free_ref_frame(frames)
{
    var i=int_;

    for (i = 0; i < NUM_REF_FRAMES; i++)
        if (frames[i].ref_cnt == 0)
        {
            frames[i].ref_cnt = 1;
            return frames[i];
        }

    assert(0);
    return null;
}


//1191
function
fixup_left(predict,
		   predict_off,
           width,
           stride,
           row,
           mode)
{
    /* The left column of out-of-frame pixels is taken to be 129,
     * unless we're doing DC_PRED, in which case we duplicate the
     * above row, unless this is also row 0, in which case we use
     * 129.
     */
    var left = predict; var left_off = predict_off - 1;//*
    var i=int_;

    if (mode == DC_PRED && row)
    {
        var above = predict; var above_off = predict_off - stride;//*

        for (i = 0; i < width; i++)
        {
            left[left_off] = above[above_off+ i];//*
            left_off += stride;
        }
    }
    else
    {
        /* Need to re-set the above row, in case the above MB was
         * DC_PRED.
         */
        left_off -= stride;

        for (i = -1; i < width; i++)
        {
            left[left_off] = 129;//*
            left_off += stride;
        }
    }
}


//1232
function
fixup_above(predict,
			predict_off,
            width,
            stride,
            col,
            mode)
{
    /* The above row of out-of-frame pixels is taken to be 127,
     * unless we're doing DC_PRED, in which case we duplicate the
     * left col, unless this is also col 0, in which case we use
     * 127.
     */
    var above = predict; var above_off = predict_off - stride;//*
    var i=int_;

    if (mode == DC_PRED && col)
    {
        var left = predict; var left_off = predict_off - 1;//*

        for (i = 0; i < width; i++)
        {
            above[above_off+ i] = left[left_off];//*
            left_off += stride;
        }
    }
    else
        /* Need to re-set the left col, in case the last MB was
         * DC_PRED.
         */
        memset(above, above_off - 1, 127, width + 1);

    memset(above, above_off + width, 127, 4); // for above-right subblock modes
}


//1267
function
vp8_dixie_predict_init(ctx)
{

    var i=int_;
    var this_frame_base=char_;var this_frame_base_off=0;//*

    if (ctx.frame_hdr.frame_size_updated)
    {
        for (i = 0; i < NUM_REF_FRAMES; i++)
        {
            var w = ctx.mb_cols * 16 + BORDER_PIXELS * 2;
            var h = ctx.mb_rows * 16 + BORDER_PIXELS * 2;

            vpx_img_free(ctx.frame_strg[i].img);
            ctx.frame_strg[i].ref_cnt = 0;
            ctx.ref_frames[i] = null;

            if (!vpx_img_alloc(ctx.frame_strg[i].img,
                               IMG_FMT_I420, w, h, 16))
                vpx_internal_error(ctx.error, VPX_CODEC_MEM_ERROR,
                                   "Failed to allocate %dx%d"+
                                   " framebuffer",
                                   w, h);

            vpx_img_set_rect(ctx.frame_strg[i].img,
                             BORDER_PIXELS, BORDER_PIXELS,
                             ctx.frame_hdr.kf.w, ctx.frame_hdr.kf.h);

        }

        if (ctx.frame_hdr.version)
            ctx.subpixel_filters = bilinear_filters;
        else
            ctx.subpixel_filters = sixtap_filters;
    }

    /* Find a free framebuffer to predict into */
    if (ctx.ref_frames[CURRENT_FRAME])
        vp8_dixie_release_ref_frame(ctx.ref_frames[CURRENT_FRAME]);

    ctx.ref_frames[CURRENT_FRAME] =
        vp8_dixie_find_free_ref_frame(ctx.frame_strg);
    this_frame_base = ctx.ref_frames[CURRENT_FRAME].img.img_data;

    /* Calculate offsets to the other reference frames */
    for (i = 0; i < NUM_REF_FRAMES; i++)
    {
        var ref = ctx.ref_frames[i];

        ctx.ref_frame_offsets[i] =
            ref ? ref.img.img_data_off - this_frame_base_off : 0;ctx.ref_frame_offsets_[i] = ref ? ref.img.img_data : this_frame_base;
    }

    /* TODO: No need to do this on every frame... */
}

var img_1=new img_index();
//1339
function
vp8_dixie_predict_process_row(ctx,
                              row,
                              start_col,
                              num_cols)
{
    var img=img_1;
    var mbi;var mbi_off=0;//*='(mb_info)'
    var col=int_;
    var coeffs=short_;var coeffs_off=0;//*

    /* Adjust pointers based on row, start_col */
    img.stride    = ctx.ref_frames[CURRENT_FRAME].img.stride[PLANE_Y];
    img.uv_stride = ctx.ref_frames[CURRENT_FRAME].img.stride[PLANE_U];
    img.y 	  = ctx.ref_frames[CURRENT_FRAME].img.planes[PLANE_Y];
    img.y_off = ctx.ref_frames[CURRENT_FRAME].img.planes_off[PLANE_Y];
    img.u 	  = ctx.ref_frames[CURRENT_FRAME].img.planes[PLANE_U];
    img.u_off = ctx.ref_frames[CURRENT_FRAME].img.planes_off[PLANE_U];
    img.v 	  = ctx.ref_frames[CURRENT_FRAME].img.planes[PLANE_V];
    img.v_off = ctx.ref_frames[CURRENT_FRAME].img.planes_off[PLANE_V];
    img.y_off += (img.stride * row + start_col) * 16;
    img.u_off += (img.uv_stride * row + start_col) * 8;
    img.v_off += (img.uv_stride * row + start_col) * 8;
    mbi = ctx.mb_info_rows[1+ row]; mbi_off = ctx.mb_info_rows_off[1+ row] + start_col;
    coeffs = ctx.tokens[row & (ctx.token_hdr.partitions - 1)].coeffs;
	coeffs_off = //todo: mit coeffs off?
             + 25 * 16 * start_col;

    /* Fix up the out-of-frame pixels */
    if (start_col == 0)
    {
        fixup_left(img.y, img.y_off, 16, img.stride, row, mbi[mbi_off].base.y_mode);
        fixup_left(img.u, img.u_off, 8, img.uv_stride, row, mbi[mbi_off].base.uv_mode);
        fixup_left(img.v, img.v_off, 8, img.uv_stride, row, mbi[mbi_off].base.uv_mode);

        if (row == 0)
            (img.y[img.y_off - img.stride - 1]) = 127;//*
    }

    for (col = start_col; col < start_col + num_cols; col++)
    {
        if (row == 0)
        {
            fixup_above(img.y, img.y_off, 16, img.stride, col, mbi[mbi_off].base.y_mode);
            fixup_above(img.u, img.u_off, 8, img.uv_stride, col,
                        mbi[mbi_off].base.uv_mode);
            fixup_above(img.v, img.v_off, 8, img.uv_stride, col,
                        mbi[mbi_off].base.uv_mode);
        }

        if (mbi[mbi_off].base.y_mode <= B_PRED)
        {
            predict_intra_luma(img.y, img.y_off, img.stride, mbi[mbi_off], coeffs, coeffs_off);
            predict_intra_chroma(img.u, img.u_off, img.v, img.v_off, img.uv_stride, mbi[mbi_off],
                                 coeffs, coeffs_off);
        }
        else
        {
            if (mbi[mbi_off].base.y_mode != SPLITMV) // && != BPRED
                fixup_dc_coeffs(mbi[mbi_off], coeffs, coeffs_off);

            if (mbi[mbi_off].base.need_mc_border)
                predict_inter_emulated_edge(ctx, img, coeffs, coeffs_off, mbi[mbi_off], col,
                                            row);
            else
                predict_inter(ctx, img, coeffs, coeffs_off, mbi[mbi_off]);
        }

        /* Advance to the next macroblock */
        mbi_off++;
        img.y_off += 16;
        img.u_off += 8;
        img.v_off += 8;
        coeffs_off += 25 * 16;
    }

    if (col == ctx.mb_cols)
    {
        /* Extend the last row by four pixels for intra prediction.
         * This will be propagated later by copy_down.
         */
        var extend = img.y; var extend_off = (img.y_off + 15 * img.stride);//(uint32_t *)
        var val = img.y[img.y_off -1 + 15 * img.stride];//0x01010101 * 
        extend[extend_off] = extend[extend_off+1] = extend[extend_off+2] = extend[extend_off+3] = val;
    }
}


//22
var
    FRAME_HEADER_SZ = 3,
    KEYFRAME_HEADER_SZ = 7
;


//29
function ARRAY_COPY(a,b) {
    assert(a.length==b.length);memcpy(a, 0, b, 0, a.length);}
//31
function
decode_entropy_header(ctx,
                      bool,
                      hdr)
{
    var i=int_, j=int_, k=int_, l=int_; var ii=0;

    /* Read coefficient probability updates */
    for (i = 0; i < BLOCK_TYPES; i++)
        for (j = 0; j < COEF_BANDS; j++)
            for (k = 0; k < PREV_COEF_CONTEXTS; k++)
                for (l = 0; l < ENTROPY_NODES; l++) {
                    if (bool_get(bool,
                                 k_coeff_entropy_update_probs
                                     [i][j][k][l]))
                        hdr.coeff_probs_[ii] = hdr.coeff_probs[i][j][k][l] =
                            bool_get_uint(bool, 8);
						ii++;
				}

    /* Read coefficient skip mode probability */
    hdr.coeff_skip_enabled = bool_get_bit(bool);

    if (hdr.coeff_skip_enabled)
        hdr.coeff_skip_prob = bool_get_uint(bool, 8);

    /* Parse interframe probability updates */
    if (!ctx.frame_hdr.is_keyframe)
    {
        hdr.prob_inter = bool_get_uint(bool, 8);
        hdr.prob_last  = bool_get_uint(bool, 8);
        hdr.prob_gf    = bool_get_uint(bool, 8);

        if (bool_get_bit(bool))
            for (i = 0; i < 4; i++)
                hdr.y_mode_probs[i] = bool_get_uint(bool, 8);

        if (bool_get_bit(bool))
            for (i = 0; i < 3; i++)
                hdr.uv_mode_probs[i] = bool_get_uint(bool, 8);

        for (i = 0; i < 2; i++)
            for (j = 0; j < MV_PROB_CNT; j++)
                if (bool_get(bool, k_mv_entropy_update_probs[i][j]))
                {
                    var x = bool_get_uint(bool, 7);
                    hdr.mv_probs[i][j] = x ? x << 1 : 1;
                }
    }
}


//81
function
decode_reference_header(ctx,
                        bool,
                        hdr)
{
    var key = ctx.frame_hdr.is_keyframe;

    hdr.refresh_gf    = key ? 1 : bool_get_bit(bool);
    hdr.refresh_arf   = key ? 1 : bool_get_bit(bool);
    hdr.copy_gf       = key ? 0 : !hdr.refresh_gf
                         ? bool_get_uint(bool, 2) : 0;
    hdr.copy_arf      = key ? 0 : !hdr.refresh_arf
                         ? bool_get_uint(bool, 2) : 0;
    hdr.sign_bias[GOLDEN_FRAME] = key ? 0 : bool_get_bit(bool);
    hdr.sign_bias[ALTREF_FRAME] = key ? 0 : bool_get_bit(bool);
    hdr.refresh_entropy = bool_get_bit(bool);
    hdr.refresh_last  = key ? 1 : bool_get_bit(bool);
}


//101
function
decode_quantizer_header(ctx,
                        bool,
                        hdr)
{
    var update=int_;
    var last_q = hdr.q_index;

    hdr.q_index = bool_get_uint(bool, 7);
    update = (last_q != hdr.q_index)+0;
    update |= (hdr.y1_dc_delta_q = bool_maybe_get_int(bool, 4));
    update |= (hdr.y2_dc_delta_q = bool_maybe_get_int(bool, 4));
    update |= (hdr.y2_ac_delta_q = bool_maybe_get_int(bool, 4));
    update |= (hdr.uv_dc_delta_q = bool_maybe_get_int(bool, 4));
    update |= (hdr.uv_ac_delta_q = bool_maybe_get_int(bool, 4));
    hdr.delta_update = update;
}


//120
function
decode_and_init_token_partitions(ctx,
                                 bool,
                                 data,
                                 data_off,
                                 sz,
                                 hdr)
{
    var i=int_;

    hdr.partitions = 1 << bool_get_uint(bool, 2);

    if (sz < 3 *(hdr.partitions - 1))
        vpx_internal_error(ctx.error, VPX_CODEC_CORRUPT_FRAME,
                           "Truncated packet found parsing partition" +
                           " lengths.");

    sz -= 3 * (hdr.partitions - 1);

    for (i = 0; i < hdr.partitions; i++)
    {
        if (i < hdr.partitions - 1)
        {
            hdr.partition_sz[i] = (data[data_off+2] << 16)
                                   | (data[data_off+1] << 8) | data[data_off+0];
            data_off += 3;
        }
        else
            hdr.partition_sz[i] = sz;

        if (sz < hdr.partition_sz[i])
            vpx_internal_error(ctx.error, VPX_CODEC_CORRUPT_FRAME,
                               "Truncated partition %d", i);

        sz -= hdr.partition_sz[i];
    }


    for (i = 0; i < ctx.token_hdr.partitions; i++)
    {
        init_bool_decoder(ctx.tokens[i].bool, data, data_off,
                          ctx.token_hdr.partition_sz[i]);
        data_off += ctx.token_hdr.partition_sz[i];
    }
}


//166
function
decode_loopfilter_header(ctx,
                         bool,
                         hdr)
{
    if (ctx.frame_hdr.is_keyframe)
        memset(hdr, 0, 1/*sizeof(hdr)*/);//todo

    hdr.use_simple    = bool_get_bit(bool);
    hdr.level         = bool_get_uint(bool, 6);
    hdr.sharpness     = bool_get_uint(bool, 3);
    hdr.delta_enabled = bool_get_bit(bool);

    if (hdr.delta_enabled && bool_get_bit(bool))
    {
        var i=int_;

        for (i = 0; i < BLOCK_CONTEXTS; i++)
            hdr.ref_delta[i] = bool_maybe_get_int(bool, 6);

        for (i = 0; i < BLOCK_CONTEXTS; i++)
            hdr.mode_delta[i] = bool_maybe_get_int(bool, 6);
    }
}


//192
function
decode_segmentation_header(ctx,
                           bool,
                           hdr)
{
    if (ctx.frame_hdr.is_keyframe)
        memset(hdr, 0, 1/*sizeof(hdr)*/);//todo:

    hdr.enabled = bool_get_bit(bool);

    if (hdr.enabled)
    {
        var i=int_;

        hdr.update_map = bool_get_bit(bool);
        hdr.update_data = bool_get_bit(bool);

        if (hdr.update_data)
        {
            hdr.abs_ = bool_get_bit(bool);

            for (i = 0; i < MAX_MB_SEGMENTS; i++)
                hdr.quant_idx[i] = bool_maybe_get_int(bool, 7);

            for (i = 0; i < MAX_MB_SEGMENTS; i++)
                hdr.lf_level[i] = bool_maybe_get_int(bool, 6);
        }

        if (hdr.update_map)
        {
            for (i = 0; i < MB_FEATURE_TREE_PROBS; i++)
                hdr.tree_probs[i] = bool_get_bit(bool)
                                     ? bool_get_uint(bool, 8)
                                     : 255;
        }
    }
    else
    {
        hdr.update_map = 0;
        hdr.update_data = 0;
    }
}


//246
function
clamp_q(q)
{
    if (q < 0) return 0;
    else if (q > 127) return 127;

    return q;
}


//256
function
dc_q(q)
{
    return dc_q_lookup[clamp_q(q)];
}


//263
function
ac_q(q)
{
    return ac_q_lookup[clamp_q(q)];
}


//270
function
dequant_init(factors,
             seg,
             quant_hdr)
{
    var i=int_, q=int_;
    var dqf = factors; var dqf_off = 0;

    for (i = 0; i < (seg.enabled ? MAX_MB_SEGMENTS : 1); i++)
    {
        q = quant_hdr.q_index;

        if (seg.enabled)
            q = (!seg.abs_) ? q + seg.quant_idx[i] : seg.quant_idx[i];

        if (dqf[dqf_off].quant_idx != q || quant_hdr.delta_update)
        {
            dqf[dqf_off].factor[TOKEN_BLOCK_Y1][0] =
                dc_q(q + quant_hdr.y1_dc_delta_q);
            dqf[dqf_off].factor[TOKEN_BLOCK_Y1][1] =
                ac_q(q);
            dqf[dqf_off].factor[TOKEN_BLOCK_UV][0] =
                dc_q(q + quant_hdr.uv_dc_delta_q);
            dqf[dqf_off].factor[TOKEN_BLOCK_UV][1] =
                ac_q(q + quant_hdr.uv_ac_delta_q);
            dqf[dqf_off].factor[TOKEN_BLOCK_Y2][0] =
                dc_q(q + quant_hdr.y2_dc_delta_q) * 2;
            dqf[dqf_off].factor[TOKEN_BLOCK_Y2][1] =
                parseInt(ac_q(q + quant_hdr.y2_ac_delta_q) * 155 / 100);

            if (dqf[dqf_off].factor[TOKEN_BLOCK_Y2][1] < 8)
                dqf[dqf_off].factor[TOKEN_BLOCK_Y2][1] = 8;

            if (dqf[dqf_off].factor[TOKEN_BLOCK_UV][0] > 132)
                dqf[dqf_off].factor[TOKEN_BLOCK_UV][0] = 132;

            dqf[dqf_off].quant_idx = q;
        }

        dqf_off++;
    }
}

var bool_1=new bool_decoder();
//314
function
decode_frame(ctx,
             data,
             data_off,
             sz)
{
    var res;//='vpx_codec_err_t'
    var bool=bool_1;
    var i=int_, row=int_, partition=int_;

    ctx.saved_entropy_valid = 0;

    if ((res = vp8_parse_frame_header(data, sz, ctx.frame_hdr)))
        vpx_internal_error(ctx.error, res,
                           "Failed to parse frame header");

    if (ctx.frame_hdr.is_experimental)
        vpx_internal_error(ctx.error, VPX_CODEC_UNSUP_BITSTREAM,
                           "Experimental bitstreams not supported.");

    data_off += FRAME_HEADER_SZ;
    sz -= FRAME_HEADER_SZ;

    if (ctx.frame_hdr.is_keyframe)
    {
        data_off += KEYFRAME_HEADER_SZ;
        sz -= KEYFRAME_HEADER_SZ;
        ctx.mb_cols = parseInt((ctx.frame_hdr.kf.w + 15) / 16,10);
        ctx.mb_rows = parseInt((ctx.frame_hdr.kf.h + 15) / 16,10);
    }

    /* Start the bitreader for the header/entropy partition */
    init_bool_decoder(bool, data, data_off, ctx.frame_hdr.part0_sz);

    /* Skip the colorspace and clamping bits */
    if (ctx.frame_hdr.is_keyframe)
        if (bool_get_uint(bool, 2))
            vpx_internal_error(ctx.error, VPX_CODEC_UNSUP_BITSTREAM,
                               "Reserved bits not supported.");

    decode_segmentation_header(ctx, bool, ctx.segment_hdr);
    decode_loopfilter_header(ctx, bool, ctx.loopfilter_hdr);
    decode_and_init_token_partitions(ctx,
                                     bool,
                                     data, data_off + ctx.frame_hdr.part0_sz,
                                     sz - ctx.frame_hdr.part0_sz,
                                     ctx.token_hdr);
    decode_quantizer_header(ctx, bool, ctx.quant_hdr);
    decode_reference_header(ctx, bool, ctx.reference_hdr);

    /* Set keyframe entropy defaults. These get updated on keyframes
     * regardless of the refresh_entropy setting.
     */
    if (ctx.frame_hdr.is_keyframe)
    {
		var i=int_, j=int_, k=int_, l=int_; var ii=0;
	
		/* Read coefficient probability updates */
		for (i = 0; i < BLOCK_TYPES; i++)
			for (j = 0; j < COEF_BANDS; j++)
				for (k = 0; k < PREV_COEF_CONTEXTS; k++)
					for (l = 0; l < ENTROPY_NODES; l++) {
						ctx.entropy_hdr.coeff_probs_[ii]=ctx.entropy_hdr.coeff_probs[i][j][k][l]=k_default_coeff_probs[i][j][k][l];
						ii++;
					}
        //=newObjectI(// ARRAY_COPY(ctx.entropy_hdr.coeff_probs,
        //           k_default_coeff_probs);//k_default_coeff_probs);
        ctx.entropy_hdr.mv_probs=new //ARRAY_COPY(
                   k_default_mv_probs();
        ARRAY_COPY(ctx.entropy_hdr.y_mode_probs,
                   k_default_y_mode_probs);
        ARRAY_COPY(ctx.entropy_hdr.uv_mode_probs,
                   k_default_uv_mode_probs);
    }

    if (!ctx.reference_hdr.refresh_entropy)
    {
        //ctx.saved_entropy = newObjectI(ctx.entropy_hdr);
		var to = ctx.saved_entropy, from = ctx.entropy_hdr;
		var ii=0;
		for (i = 0; i < BLOCK_TYPES; i++)
			for (j = 0; j < COEF_BANDS; j++)
				for (k = 0; k < PREV_COEF_CONTEXTS; k++)
					for (l = 0; l < ENTROPY_NODES; l++) {
						to.coeff_probs_[ii]=to.coeff_probs[i][j][k][l]=from.coeff_probs[i][j][k][l];
						ii++;
					}
		//for(i=0;i<1056;++i)
		//to.coeff_probs_[i]		= from.coeff_probs_[i];
		to.coeff_skip_enabled	= from.coeff_skip_enabled;
		to.coeff_skip_prob		= from.coeff_skip_prob;
		for(i=0;i<2;++i)
		for(j=0;j<19;++j)
		to.mv_probs[i][j]		= from.mv_probs[i][j];
		to.prob_gf				= from.prob_gf;
		to.prob_inter			= from.prob_inter;
		to.prob_last			= from.prob_last;
		for(i=0;i<3;++i)
		to.uv_mode_probs[i]		= from.uv_mode_probs[i];
		for(i=0;i<4;++i)
		to.y_mode_probs[i]		= from.y_mode_probs[i];
		
        ctx.saved_entropy_valid = 1;
    }

    decode_entropy_header(ctx, bool, ctx.entropy_hdr);

    vp8_dixie_modemv_init(ctx);
    vp8_dixie_tokens_init(ctx);
    vp8_dixie_predict_init(ctx);
    dequant_init(ctx.dequant_factors, ctx.segment_hdr,
                 ctx.quant_hdr);

    for (row = 0, partition = 0; row < ctx.mb_rows; row++)
    {
        vp8_dixie_modemv_process_row(ctx, bool, row, 0, ctx.mb_cols);
        vp8_dixie_tokens_process_row(ctx, partition, row, 0,
                                     ctx.mb_cols);
        vp8_dixie_predict_process_row(ctx, row, 0, ctx.mb_cols);

//        if (ctx.loopfilter_hdr.level && row)
//            vp8_dixie_loopfilter_process_row(ctx, row - 1, 0,
//                                             ctx.mb_cols);

        if (++partition == ctx.token_hdr.partitions)
            partition = 0;
    }

//    if (ctx.loopfilter_hdr.level)
//        vp8_dixie_loopfilter_process_row(ctx, row - 1, 0, ctx.mb_cols);

    ctx.frame_cnt++;

    if (!ctx.reference_hdr.refresh_entropy)
    {
        //ctx.entropy_hdr = ctx.saved_entropy;
		var to = ctx.entropy_hdr, from = ctx.saved_entropy;
		var ii=0;
		for (i = 0; i < BLOCK_TYPES; i++)
			for (j = 0; j < COEF_BANDS; j++)
				for (k = 0; k < PREV_COEF_CONTEXTS; k++)
					for (l = 0; l < ENTROPY_NODES; l++) {
						to.coeff_probs_[ii]=to.coeff_probs[i][j][k][l]=from.coeff_probs[i][j][k][l]=from.coeff_probs_[ii];
						ii++;
					}
		//for(i=0;i<1056;++i)
		//to.coeff_probs_[i]		= from.coeff_probs_[i];
		to.coeff_skip_enabled	= from.coeff_skip_enabled;
		to.coeff_skip_prob		= from.coeff_skip_prob;
		for(i=0;i<2;++i)
		for(j=0;j<19;++j)
		to.mv_probs[i][j]		= from.mv_probs[i][j];
		to.prob_gf				= from.prob_gf;
		to.prob_inter			= from.prob_inter;
		to.prob_last			= from.prob_last;
		for(i=0;i<3;++i)
		to.uv_mode_probs[i]		= from.uv_mode_probs[i];
		for(i=0;i<4;++i)
		to.y_mode_probs[i]		= from.y_mode_probs[i];
		
        ctx.saved_entropy_valid = 0;
    }

    /* Handle reference frame updates */
    if (ctx.reference_hdr.copy_arf == 1)
    {
        vp8_dixie_release_ref_frame(ctx.ref_frames[ALTREF_FRAME]);
        ctx.ref_frames[ALTREF_FRAME] =
            vp8_dixie_ref_frame(ctx.ref_frames[LAST_FRAME]);
    }
    else if (ctx.reference_hdr.copy_arf == 2)
    {
        vp8_dixie_release_ref_frame(ctx.ref_frames[ALTREF_FRAME]);
        ctx.ref_frames[ALTREF_FRAME] =
            vp8_dixie_ref_frame(ctx.ref_frames[GOLDEN_FRAME]);
    }

    if (ctx.reference_hdr.copy_gf == 1)
    {
        vp8_dixie_release_ref_frame(ctx.ref_frames[GOLDEN_FRAME]);
        ctx.ref_frames[GOLDEN_FRAME] =
            vp8_dixie_ref_frame(ctx.ref_frames[LAST_FRAME]);
    }
    else if (ctx.reference_hdr.copy_gf == 2)
    {
        vp8_dixie_release_ref_frame(ctx.ref_frames[GOLDEN_FRAME]);
        ctx.ref_frames[GOLDEN_FRAME] =
            vp8_dixie_ref_frame(ctx.ref_frames[ALTREF_FRAME]);
    }

    if (ctx.reference_hdr.refresh_gf)
    {
        vp8_dixie_release_ref_frame(ctx.ref_frames[GOLDEN_FRAME]);
        ctx.ref_frames[GOLDEN_FRAME] =
            vp8_dixie_ref_frame(ctx.ref_frames[CURRENT_FRAME]);
    }

    if (ctx.reference_hdr.refresh_arf)
    {
        vp8_dixie_release_ref_frame(ctx.ref_frames[ALTREF_FRAME]);
        ctx.ref_frames[ALTREF_FRAME] =
            vp8_dixie_ref_frame(ctx.ref_frames[CURRENT_FRAME]);
    }

    if (ctx.reference_hdr.refresh_last)
    {
        vp8_dixie_release_ref_frame(ctx.ref_frames[LAST_FRAME]);
        ctx.ref_frames[LAST_FRAME] =
            vp8_dixie_ref_frame(ctx.ref_frames[CURRENT_FRAME]);
    }

}


//476
function CHECK_FOR_UPDATE(lval,rval,update_flag) {do {
        var old = lval;
        update_flag[0] |= (old != (lval = rval));
    } while(0)
	return lval;
}

//481
function
vp8_parse_frame_header(data,
                       sz,
                       hdr)
{
    var raw=long_;

    if (sz < 10)
        return VPX_CODEC_CORRUPT_FRAME;

    /* The frame header is defined as a three byte little endian
     * value
     */
    raw = data[0] | (data[1] << 8) | (data[2] << 16);
    hdr.is_keyframe     = !BITS_GET(raw, 0, 1);
    hdr.version         = BITS_GET(raw, 1, 2);
    hdr.is_experimental = BITS_GET(raw, 3, 1);
    hdr.is_shown        = BITS_GET(raw, 4, 1);
    hdr.part0_sz        = BITS_GET(raw, 5, 19);

    if (sz <= hdr.part0_sz + (hdr.is_keyframe ? 10 : 3))
        return VPX_CODEC_CORRUPT_FRAME;

    hdr.frame_size_updated = 0;

    if (hdr.is_keyframe)
    {
        var update = [0];

        /* Keyframe header consists of a three byte sync code followed
         * by the width and height and associated scaling factors.
         */
        if (data[3] != 0x9d || data[4] != 0x01 || data[5] != 0x2a)
            return VPX_CODEC_UNSUP_BITSTREAM;

        raw = data[6] | (data[7] << 8)
              | (data[8] << 16) | (data[9] << 24);
        hdr.kf.w 		= CHECK_FOR_UPDATE(hdr.kf.w,       BITS_GET(raw,  0, 14),
                         					update);
        hdr.kf.scale_w	= CHECK_FOR_UPDATE(hdr.kf.scale_w, BITS_GET(raw, 14,  2),
                         					update);
        hdr.kf.h		= CHECK_FOR_UPDATE(hdr.kf.h,       BITS_GET(raw, 16, 14),
                         					update);
        hdr.kf.scale_h	= CHECK_FOR_UPDATE(hdr.kf.scale_h, BITS_GET(raw, 30,  2),
                         					update);

        hdr.frame_size_updated = update[0];

        if (!hdr.kf.w || !hdr.kf.h)
            return VPX_CODEC_UNSUP_BITSTREAM;
    }

    return VPX_CODEC_OK;
}


//537
function
vp8_dixie_decode_frame(ctx,
                       data,
                       sz)
{
    var ctx_ = ctx;

    ctx.error.error_code = VPX_CODEC_OK;
    ctx.error.has_detail = 0;

    if (!setjmp(ctx.error.jmp))
        decode_frame(ctx, data, 0, sz);

    return ctx_.error.error_code;
}


//554
function
vp8_dixie_decode_destroy(ctx)
{
    vp8_dixie_predict_destroy(ctx);
    vp8_dixie_tokens_destroy(ctx);
    vp8_dixie_modemv_destroy(ctx);
}


//var vpx_codec_stream_info_t  = vp8_stream_info_t;

var vpx_codec_alg_priv = function()
{
    //base=new vpx_codec_priv_t(),
    //cfg=newObjectI(vpx_codec_dec_cfg_t),
    //si=newObjectI(vp8_stream_info_t),
    decoder_ctx=new vp8_decoder_ctx(),
    img=new vpx_image_t(),
    img_avail=int_
};


function
update_error_state(ctx,
                   error)
{
    var res;//='vpx_codec_err_t'

    if ((res = error.error_code))
        ctx.base.err_detail = error.has_detail
                               ? error.detail
                               : null;

    return res;
}


function vp8_init(ctx)
{
    var        res = VPX_CODEC_OK;

    /* This function only allocates space for the vpx_codec_alg_priv_t
     * structure. More memory may be required at the time the stream
     * information becomes known.
     */
    if (!ctx.priv)

    {
        var priv = new vpx_codec_alg_priv_t();//vpx_calloc(1, sizeof(vpx_codec_alg_priv_t));

        ctx.priv = priv;

        if (!ctx.priv)
            return VPX_CODEC_MEM_ERROR;

        ctx.priv.sz = 1/*sizeof(vpx_codec_alg_priv_t)*/;
        ctx.priv.iface = ctx.iface;
        ctx.priv.alg_priv = priv;
        ctx.priv.init_flags = ctx.init_flags;

        if (ctx.config.dec)
        {
            /* Update the reference to the config structure to our copy. */
            ctx.priv.alg_priv.cfg = ctx.config.dec;
            ctx.config.dec = ctx.priv.alg_priv.cfg;
        }
    }

    return res;
}


function vp8_destroy(ctx)
{
    vp8_dixie_decode_destroy(ctx.decoder_ctx);
    ctx.base.alg_priv='';//vpx_free(ctx.base.alg_priv);
    return VPX_CODEC_OK;
}


function vp8_peek_si(data,
                     data_sz,
                     si)
{
    var hdr=new vp8_frame_hdr();
    var res = VPX_CODEC_OK;


    if (!(res = vp8_parse_frame_header(data, data_sz, hdr)))
    {
        si.is_kf = hdr.is_keyframe;

        if (si.is_kf)
        {
            si.w = hdr.kf.w;
            si.h = hdr.kf.h;
        }
        else
        {
            si.w = 0;
            si.h = 0;
        }
    }

    return res;

}


function vp8_get_si(ctx,
                    si)
{

    var sz=int_;

    if (si.sz >= 1/*sizeof(vp8_stream_info_t)*/)
        sz = 1/*sizeof(vp8_stream_info_t)*/;
    else
        sz = 1/*sizeof(vpx_codec_stream_info_t)*/;

    memcpy(si, ctx.si, sz);alert('todo');
    si.sz = sz;

    return VPX_CODEC_OK;
}


function vp8_decode(ctx,
                    data,
                    data_sz,
                    user_priv,
                    deadline)
{
    var res = VPX_CODEC_OK;

    res = vp8_dixie_decode_frame(ctx.decoder_ctx, data, data_sz);
    if(res)
        update_error_state(ctx, ctx.decoder_ctx.error);

    ctx.img_avail = ctx.decoder_ctx.frame_hdr.is_shown;
    ctx.img = ctx.decoder_ctx.ref_frames[CURRENT_FRAME].img;
    return res;
}


function vp8_get_frame(ctx,
                       iter)
{
    var img = null;

    if (ctx.img_avail)
    {
        /* iter acts as a flip flop, so an image is only returned on the first
         * call to get_frame.
         */
        if (!(iter[0]))
        {
            img = ctx.img;
            iter[0] = img;
        }
    }

    return img;
}


var ctf_maps = create_obj_vals_from_arrayChilds(vpx_codec_ctrl_fn_map_t,
[
    [ -1, null]
]
);


//#ifndef VERSION_STRING
//#define VERSION_STRING
//#endif
CODEC_INTERFACE('vpx_codec_vp8_dx',
//vpx_codec_iface_t vpx_codec_vp8_dx_algo =
new Array(
    "VP8 \"Dixie\" Decoder" + VERSION_STRING,
    VPX_CODEC_INTERNAL_ABI_VERSION,
    VPX_CODEC_CAP_DECODER,
    /* vpx_codec_caps_t          caps; */
    'vp8_init',         /* vpx_codec_init_fn_t       init; */
    'vp8_destroy',      /* vpx_codec_destroy_fn_t    destroy; */
    'ctf_maps',         /* vpx_codec_ctrl_fn_map_t  *ctrl_maps; */
    null,             /* vpx_codec_get_mmap_fn_t   get_mmap; */
    null,             /* vpx_codec_set_mmap_fn_t   set_mmap; */
    new Array(
        'vp8_peek_si',      /* vpx_codec_peek_si_fn_t    peek_si; */
        'vp8_get_si',       /* vpx_codec_get_si_fn_t     get_si; */
        'vp8_decode',       /* vpx_codec_decode_fn_t     decode; */
        'vp8_get_frame'    /* vpx_codec_frame_get_fn_t  frame_get; */
    )//,
    //{NOT_IMPLEMENTED} /* encoder functions */
)
);



function webmdata(response) {
	//alert(response);
	main(response);//convertBinaryToArray()
}
window['webmdata']=webmdata;

var VP8_FOURCC = (0x00385056); //row:51
var	ifaces = new Array(
{
    name:char_,
    iface:0,//'newObjectI(vpx_codec_iface_t)'
    fourcc:int_,
    fourcc_mask:int_
});
//#if CONFIG_VP8_DECODER
   ifaces[0] = {name:"vp8",  iface:new vpx_codec_vp8_dx_algo(),   fourcc:VP8_FOURCC, fourcc_mask:0x00FFFFFF};
//#endif

var //enum file_kind 202
//{
    RAW_FILE=0,
    IVF_FILE=1,
    WEBM_FILE=2
//}
;

var IVF_FRAME_HDR_SZ = (/*sizeof(uint32_t)**/4 + /*sizeof(uint64_t)**/8);
var RAW_FRAME_HDR_SZ = (/*sizeof(uint32_t)**/4);
function read_frame(input,
                      	buf,
                      	buf_off,
                      	buf_sz,
                      	buf_alloc_sz)
{
    var raw_hdr=new Array(IVF_FRAME_HDR_SZ);//Arr(IVF_FRAME_HDR_SZ,char);
    var new_buf_sz=size_t;
    var infile = input.infile;
    var kind = input.kind;
    if(kind == WEBM_FILE)
    {
        if(input.chunk >= input.chunks)
        {
            var track=[int_];

            do
            {
                /* End of this packet, get another. */
                if(input.pkt)
                    nestegg_free_packet(input.pkt);

                if(nestegg_read_packet(input.nestegg_ctx, input.pkt) <= 0
                   || nestegg_packet_track(input.pkt, track))
                    return 1;

            } while(track != input.video_track);

            if(nestegg_packet_count(input.pkt, input.chunks))//todo: input.chunks with return val (defined)
                return 1;
            input.chunk = 0;
        }

        if(nestegg_packet_data(input.pkt, input.chunk, buf, buf_sz))
            return 1;
        input.chunk++;

        return 0;
    }
    /* For both the raw and ivf formats, the frame size is the first 4 bytes
     * of the frame header. We just need to special case on the header
     * size.
     */
    /*not  implemented
	else if (fread(raw_hdr, kind==IVF_FILE
                   ? IVF_FRAME_HDR_SZ : RAW_FRAME_HDR_SZ, 1, infile) != 1)
    {
        if (!feof(infile))
            fprintf(stderr, "Failed to read frame size\n");

        new_buf_sz = 0;
    }
    else
    {
        new_buf_sz = mem_get_le32(raw_hdr);

        if (new_buf_sz > 256 * 1024 * 1024)
        {
            fprintf(stderr, "Error: Read invalid frame size (%u)\n",
                    (unsigned int)new_buf_sz);
            new_buf_sz = 0;
        }

        if (kind == RAW_FILE && new_buf_sz > 256 * 1024)
            fprintf(stderr, "Warning: Read invalid frame size (%u)"
                    " - not a raw file?\n", (unsigned int)new_buf_sz);

        if (new_buf_sz > *buf_alloc_sz)
        {
            uint8_t *new_buf = realloc(*buf, 2 * new_buf_sz);

            if (new_buf)
            {
                *buf = new_buf;
                *buf_alloc_sz = 2 * new_buf_sz;
            }
            else
            {
                fprintf(stderr, "Failed to allocate compressed data buffer\n");
                new_buf_sz = 0;
            }
        }
    }not implemnted*/

    buf_sz[0] = new_buf_sz;

    if (buf_sz)
    {
        if (fread(buf, 1, buf_sz[0], infile) != buf_sz[0])
        {
            fprintf(stderr, "Failed to read full frame\n");//todo:
            return 1;
        }

        return 0;
    }

    return 1;
}

var input_ctx = function()
{
    this.kind=0,//enum'file_kind'
    this.infile=0,//*'FILE'
    this.nestegg_ctx=new nestegg(),//*
    this.pkt=[null],//newObjectI(nestegg_packet),//*
    this.chunk=int_,
    this.chunks=[int_],
    this.video_track=int_
};

function //479
nestegg_read_cb(buffer, length, userdata)
{
    var f = userdata;//*
	//userdata.val;
	
    if(fread(buffer, 1, length, f) < length)
    {
        /*if (ferror(f))
            return -1;*/
        if (feof(f))
            return 0;
    }
    return 1;
}


function //495
nestegg_seek_cb(offset, whence, userdata)
{
    switch(whence) {
        case NESTEGG_SEEK_SET: whence = SEEK_SET; break;
        case NESTEGG_SEEK_CUR: whence = SEEK_CUR; break;
        case NESTEGG_SEEK_END: whence = SEEK_END; break;
    };
    return fseek(userdata, offset, whence)? -1 : 0;
}


function//508
nestegg_tell_cb(userdata)
{
    return ftell(userdata);
}


//570
function
file_is_webm(input,
             fourcc,
             width,
             height,
             fps_den,
             fps_num)
{
    var i=int_, n=[int_];
    var track_type = -1;

    //todo by d nestegg_io
	var io = {read:nestegg_read_cb, seek:nestegg_seek_cb, tell:nestegg_tell_cb,
                     userdata:input.infile};//nestegg_io
    var params=new nestegg_video_params();
	input.nestegg_ctx = [input.nestegg_ctx];
    if(nestegg_init(input.nestegg_ctx, io, null))
        alert('goto fail');
	input.nestegg_ctx=input.nestegg_ctx[0];

    if(nestegg_track_count(input.nestegg_ctx, n))
        alert('goto fail');

    for(i=0; i<n; i++)
    {
        track_type = nestegg_track_type(input.nestegg_ctx, i);

        if(track_type == NESTEGG_TRACK_VIDEO)
            break;
        else if(track_type < 0)
            alert('goto fail');
    }

    if(nestegg_track_codec_id(input.nestegg_ctx, i) != NESTEGG_CODEC_VP8)
    {
        fprintf(stderr, "Not VP8 video, quitting.\n");
        exit(1);
    }

    input.video_track = i;

    if(nestegg_track_video_params(input.nestegg_ctx, i, params))
        alert('goto fail');

    fps_den[0] = 0;
    fps_num[0] = 0;
    fourcc[0] = VP8_FOURCC;
    width[0] = params.width;
    height[0] = params.height;
    return 1;
/*fail:
    input.nestegg_ctx = null;
    //rewind(input.infile);
    return 0;*/
}


//697
function main(AJAX_response, argc, argv_)
{
    var fn              =	null;//char *fn
    var i               =   int_;
    var buf 			= [null];	var buf_off=[null];
    var buf_sz 			= [0], buf_alloc_sz = [0];
    var infile			= {data:AJAX_response, data_off:0}; //:todo FILE object create - finish!
//    var frame_in 		= 0, frame_out = 0, flipuv = 0, noblit = 0, do_md5 = 0, progress = 0;
//    var stop_after 		= 0, postproc = 0, summary = 0, quiet = 1;
//    var ec_enabled 		= 0;
//    var iface 			= newObjectI(vpx_codec_iface_t);//null;
    var fourcc=[int_];
    var width=[int_];
    var height=[int_];
    var fps_den=[int_];
    var fps_num=[int_];
    //var void                   *out = NULL;
//    var cfg = newObjectI(vpx_codec_dec_cfg_t);//todo: cfg = {0};
    var input = new input_ctx();//todo: input = {0};//input_ctx
    var frames_corrupted = 0;
    var dec_flags = 0;

    input.infile = infile;
    /*if(file_is_ivf(infile, &fourcc, &width, &height, &fps_den,
                   &fps_num))
        input.kind = IVF_FILE;
    else*/ if(file_is_webm(input, fourcc, width, height, fps_den, fps_num))
        input.kind = WEBM_FILE;/*
    else if(file_is_raw(infile, &fourcc, &width, &height, &fps_den, &fps_num))
        input.kind = RAW_FILE;*/
    else
    {
        //fprintf(stderr, "Unrecognized input file type.\n");
		alert("Unrecognized input file type.\n");
        return EXIT_FAILURE;
    }

    /* Try to determine the codec from the fourcc. */
//    for (i = 0; i < sizeof(ifaces) / sizeof(ifaces[0]); i++)
//        if ((fourcc & ifaces[i].fourcc_mask) == ifaces[i].fourcc)
//        {
//            var ivf_iface = ifaces[i].iface;//vpx_codec_iface_t  *
//
////todo
////            if (iface && iface != ivf_iface)
////                fprintf(stderr, "Notice -- IVF header indicates codec: %s\n",
////                        ifaces[i].name);
////            else
//                iface = ivf_iface;
//
//            break;
//        }
//
//    dec_flags = (postproc ? VPX_CODEC_USE_POSTPROC : 0) |
//                (ec_enabled ? VPX_CODEC_USE_ERROR_CONCEALMENT : 0);
//    if (vpx_codec_dec_init(decoder, iface ? iface :  ifaces[0].iface, cfg,
//                           dec_flags))
//    {
//        fprintf(stderr, "Failed to initialize decoder: %s\n", vpx_codec_error(decoder));
//        return EXIT_FAILURE;
//    }
//
//    if (!quiet)
//        fprintf(stderr, "%s\n", decoder.name);
	var getElementById_timecode = document.getElementById('timecode');
	var getElementById_render = document.getElementById('render');
	var getElementById_frame = document.getElementById('frame');
	var startdatum = new Date();var ii=0;var isframe;var decoder2 = new vp8_decoder_ctx();
    /* Decode file */
	function readframe() {
		//while ()
    isframe=!read_frame(input, buf, buf_off, buf_sz, buf_alloc_sz);//while (!read_frame(&input, &buf, &buf_sz, &buf_alloc_sz))
    if (isframe)setTimeout(function() {//if(buf_sz>1000 && ii>164)alert(ii+' '+buf_sz);if(ii<1) continue;
        buf=buf[0]; // added by d
		startdatum = new Date();
		
		vp8_dixie_decode_frame(decoder2, buf, buf_sz);
        buf=[buf]; // added by d
		var img_avail = decoder2.frame_hdr.is_shown;
		var img = decoder2.ref_frames[0].img;
/////		
//		var iter = [null];//vpx_codec_iter_t
//        var img=newObjectI(vpx_image_t);//
//        var timer=newObjectI(vpx_usec_timer);
//        var                   corrupted=int_;
//		ii++;++frame_in;
//        vpx_usec_timer_start(timer);//&timer
//
//        if (vpx_codec_decode(decoder, buf, buf_sz, null, 0))
//        {
//            var detail = vpx_codec_error_detail(decoder);
//            fprintf(stderr, "Failed to decode frame: %s\n", vpx_codec_error(decoder));
//
//            if (detail)
//                fprintf(stderr, "  Additional information: %s\n", detail);
//
//            alert('goto fail');
//        }
//		
//        vpx_usec_timer_mark(timer);
//        dx_time += vpx_usec_timer_elapsed(timer);
//
//        ++frame_in;
//
////        /*todo:if (vpx_codec_control(&decoder, VP8D_GET_FRAME_CORRUPTED, &corrupted))
////        {
////            fprintf(stderr, "Failed VP8_GET_FRAME_CORRUPTED: %s\n",
////                    vpx_codec_error(&decoder));
////            goto fail;
////        }*/
//        frames_corrupted += corrupted;
//
//        if ((img = vpx_codec_get_frame(decoder, iter)))
//            ++frame_out;
//////		
		enddatum =new Date();
		getElementById_timecode.innerHTML=input.pkt[0].timecode+' ('+((input.pkt[0].timecode/1000000000)>>0)+' sec)';
		if(img_avail) {
		getElementById_render.innerHTML=(enddatum-startdatum)+'ms<br />FPS:'+(1000/(enddatum-startdatum)).toFixed(2);
		if (img)
		vpximg2canvas(img);
		ii++;
		getElementById_frame.innerHTML=ii;
		}
		readframe();
    },0);
	}
	readframe();
	var enddatum =new Date();
	//alert(enddatum-startdatum+' '+ii+'frames');
}